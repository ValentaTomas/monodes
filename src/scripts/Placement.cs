using System.Collections.Generic;
using UnityEngine;

// levelBuilder
public class Placement
{
    public List<Vector2Int> Blocks = new List<Vector2Int>();
    public List<Vector2Int> Targets = new List<Vector2Int>();

    private void Add(Vector2Int position, List<Vector2Int> list)
    {
        if (!list.Contains(position)) list.Add(position);
    }

    public void AddBlock(Vector2Int position)
    {
        Add(position, Blocks);
    }

    public void AddTarget(Vector2Int position)
    {
        Add(position, Targets);
    }

    public void AddBlock(int x, int y)
    {
        AddBlock(new Vector2Int(x, y));
    }

    public void AddTarget(int x, int y)
    {
        AddTarget(new Vector2Int(x, y));
    }

    public void RemoveBlock(int x, int y)
    {
        Blocks.Remove(new Vector2Int(x, y));
    }

    public void RemoveTarget(int x, int y)
    {
        Targets.Remove(new Vector2Int(x, y));
    }

    public void AddBlocks(Vector2Int start, Vector2Int stop)
    {
        if (start.x > stop.x || start.y > stop.y) return;
        for (var x = start.x; x <= stop.x; x++)
        for (var y = start.y; y <= stop.y; y++)
            AddBlock(x, y);
    }

    public void RemoveBlocks(Vector2Int start, Vector2Int stop)
    {
        if (start.x > stop.x || start.y > stop.y) return;
        for (var x = start.x; x <= stop.x; x++)
        for (var y = start.y; y <= stop.y; y++)
            RemoveBlock(x, y);
    }
}