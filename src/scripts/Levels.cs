using System.Collections.Generic;
using UnityEngine;

public static class Levels
{
    public static IList<Placement> Layout = new List<Placement>();

    static Levels()
    {
        var level = new Placement();

        level.AddBlock(0, 1);
        level.AddBlock(1, 0);
        level.AddTarget(0, 0);
        Layout.Add(level);

        level = new Placement();
        level.AddBlock(0, 1);
        level.AddBlock(1, 0);
        level.AddBlock(2, 1);
        level.AddTarget(1, 1);
        Layout.Add(level);

        level = new Placement();
        level.AddBlock(0, 1);
        level.AddBlock(1, 0);
        level.AddBlock(2, 1);
        level.AddBlock(1, 2);
        level.AddTarget(1, 1);
        Layout.Add(level);

        level = new Placement();
        level.AddBlock(0, 2);
        level.AddBlock(1, 1);
        level.AddBlock(1, 0);
        level.AddTarget(0, 0);
        Layout.Add(level);

        level = new Placement();
        level.AddBlock(0, 1);
        level.AddBlock(1, 0);
        level.AddBlock(1, 1);
        level.AddBlock(2, 0);
        level.AddTarget(1, 0);
        Layout.Add(level);

        level = new Placement();
        // gen 1
        level.AddBlock(0, 0);
        level.AddBlock(2, 1);
        level.AddBlock(0, 2);
        level.AddBlock(0, 1);
        level.AddBlock(1, 3);
        level.AddBlock(1, 2);
        level.AddBlock(1, 1);
        level.AddTarget(0, 1);
        Layout.Add(level);

        level = new Placement();
        level.AddBlocks(new Vector2Int(0, 0), new Vector2Int(3, 3));
        level.RemoveBlock(1, 2);
        level.RemoveBlock(0, 0);
        level.RemoveBlock(3, 3);
        level.RemoveBlock(3, 0);
        level.RemoveBlock(0, 3);
        level.RemoveBlock(2, 1);
        level.AddTarget(1, 1);
        Layout.Add(level);

        level = new Placement();
        level.AddBlocks(new Vector2Int(0, 0), new Vector2Int(3, 3));
        level.RemoveBlock(1, 2);
        level.RemoveBlock(3, 3);
        level.RemoveBlock(1, 1);
        level.RemoveBlock(0, 3);
        level.RemoveBlock(3, 2);
        level.RemoveBlock(2, 1);
        level.RemoveBlock(1, 1);
        level.RemoveBlock(0, 0);
        level.AddTarget(3, 1);
        Layout.Add(level);

        level = new Placement();
        level.AddBlocks(new Vector2Int(0, 0), new Vector2Int(7, 7));
        level.RemoveBlock(0, 0);
        level.RemoveBlock(7, 7);
        level.RemoveBlock(7, 0);
        level.RemoveBlock(0, 7);
        level.RemoveBlock(4, 3);
        level.RemoveBlock(3, 4);
        level.AddTarget(3, 3);
        Layout.Add(level);
    }
}