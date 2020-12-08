public class BoardManager
{

    private DropOutStack<Placement> UndoStack = new DropOutStack<Placement>(1);
    public GameObject verticalLinePrefab;
    public int Rows { get; private set; }
    public int Columns { get; private set; }

    public GameObject BoardContainer { get; set; }

    private Zone[,] Board { get; set; }
    private IList<Target> Targets { get; } = new List<Target>();
    private IList<Block> Blocks { get; } = new List<Block>();
    private IList<Point> Points { get; } = new List<Point>();

    public event UndoChangeHandler OnUndoChange;

    private void ChangeUndo()
    {
        OnUndoChange?.Invoke(this, new UndoChangeArgs(UndoStack.Count > 0));
    }
    
    public void Undo(int steps)
    {
        Placement undoSetup;
        if (UndoStack.TryDeepPop(steps, out undoSetup))
        {
            Setup(undoSetup);
        }

        ChangeUndo();
    }

    private void SavePlacement()
    {
        var placement = new Placement();
        foreach (var block in Blocks)
        {
            placement.AddBlock(block.position);
        }

        foreach (var target in Targets)
        {
            placement.AddTarget(target.position);
        }
        UndoStack.Push(placement);
        ChangeUndo();
    }


    public void Setup(Placement setupPlacement)
    {
        Setup(setupPlacement.Blocks, setupPlacement.Targets);
    }

    public void Setup(IList<Vector2Int> blockPositions, IList<Vector2Int> targetPositions)
    {
        UndoStack = new DropOutStack<Placement>(1);
        if (BoardContainer == null)
            BoardContainer = Instantiate(boardContainer, transform.position, Quaternion.identity);
        BoardContainer.GetComponent<Transform>().DetachChildren();
        DeleteAll();
        Rows = blockPositions.Max(block => block.x) + 1;
        Columns = blockPositions.Max(block => block.y) + 1;
        Board = new Zone[Rows, Columns];
        foreach (var position in blockPositions) AddBlock(position);
        foreach (var position in targetPositions) AddTarget(position);
        RefreshPoints();
    }

    public bool Failed()
    {
        return !Finished() && (Targets.Count > Blocks.Count || Points.Count == 0);
    }

    public bool Finished()
    {
        return Targets.All(target => Board[target.position.x, target.position.y] is Block) &&
               Targets.Count == Blocks.Count;
    }

    public bool Trigger(Point trigger)
    {
        SavePlacement();
        var position = trigger.position;
        Debug.Log(trigger.Blocks.Count);
        foreach (var block in trigger.Blocks.ToList()) DeleteBlock(block);

        DeletePoint(trigger);
        AddBlock(position);
        return RefreshPoints();
    }

    private void DeletePoint(Point point)
    {
        Board[point.position.x, point.position.y] = null;
        Points.Remove(point);
        Destroy(point.gameObject);
    }

    private void DeleteBlock(Block block)
    {
        Board[block.position.x, block.position.y] = null;
        Blocks.Remove(block);
        Destroy(block.gameObject);
    }

    private void DeleteTarget(Target target)
    {
        Targets.Remove(target);
        Destroy(target.gameObject);
    }

    public void DeleteAll()
    {
        foreach (var target in Targets.ToList()) DeleteTarget(target);
        foreach (var block in Blocks.ToList()) DeleteBlock(block);
        foreach (var point in Points.ToList()) DeletePoint(point);
    }

    private bool RefreshPoints()
    {
        foreach (var point in Points.ToList()) DeletePoint(point);
        for (var x = 0; x < Rows; x++)
        for (var y = 0; y < Columns; y++)
            TryPointPosition(new Vector2Int(x, y));
        if (Finished())
        {
            gameObject.GetComponent<GameManager>().NextLevel();
            return true;
        }

        return false;
    }

    private void TryPointPosition(Vector2Int position)
    {
        if (Board[position.x, position.y] is Block) return;
        var blocks = new Block[4];
        Zone current;
        if (position.x - 1 >= Board.GetLowerBound(0))
        {
            //left
            current = Board[position.x - 1, position.y];
            if (current is Block) blocks[0] = current as Block;
        }

        if (position.x + 1 <= Board.GetUpperBound(0))
        {
            //right
            current = Board[position.x + 1, position.y];
            if (current is Block) blocks[1] = current as Block;
        }

        if (position.y - 1 >= Board.GetLowerBound(1))
        {
            //bottom
            current = Board[position.x, position.y - 1];
            if (current is Block) blocks[2] = current as Block;
        }

        if (position.y + 1 <= Board.GetUpperBound(1))
        {
            //top
            current = Board[position.x, position.y + 1];
            if (current is Block) blocks[3] = current as Block;
        }

        var blockList = blocks.Where(block => block != null).ToList();
        if (blockList.Count < 2) return;
        if (blockList.Count == 2)
        {
            if (blockList[0].position.x == blockList[1].position.x) return;
            if (blockList[0].position.y == blockList[1].position.y) return;
        }

        var newPoint = AddPoint(position);
        if (blocks[0] != null) newPoint.AddLine(horizontalLinePrefab, position.ToVector3(-0.5f));
        if (blocks[1] != null) newPoint.AddLine(horizontalLinePrefab, position.ToVector3(0.5f));
        if (blocks[2] != null) newPoint.AddLine(verticalLinePrefab, position.ToVector3(0f, -0.5f));
        if (blocks[3] != null) newPoint.AddLine(verticalLinePrefab, position.ToVector3(0f, 0.5f));
        newPoint.Blocks = blockList;
    }
}
