using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using System.Text;

public static class Vector2IntUtility
{
    public static Vector2Int Move(this Vector2Int vector, int x, int y)
    {
        return new Vector2Int(vector.x + x, vector.y + y);
    }
}

public class Level
{
    private int _size;
    public IList<Vector2Int> BlockPositions { get; private set; }
    public IList<Vector2Int> TargetPositions { get; private set; }
    
    public Level(string code) 
    {
        //use levelBuilder + decode
        
    }

    public Tuple<IEnumerable<Vector2Int>, IEnumerable<Vector2Int>> NormalizedPositions()
    {
        var blockMin = new Vector2Int(BlockPositions.Min(p => p.x), BlockPositions.Min(p => p.y));
        var targetMin = new Vector2Int(TargetPositions.Min(p => p.x), TargetPositions.Min(p => p.y)); 
        var min = new Vector2Int(
            blockMin.x > targetMin.x ? blockMin.x : targetMin.x,
            blockMin.y > targetMin.y ? blockMin.y : targetMin.y);

        return new Tuple<IEnumerable<Vector2Int>, IEnumerable<Vector2Int>>(
            BlockPositions.Select(pos => pos.Move(-min.x, -min.y)),
            TargetPositions.Select(pos => pos.Move(-min.x, -min.y)));
    }


    public string Code()
    {
        BitArray bitCode = new BitArray(256);
        foreach (var (blocks, targets) in NormalizedPositions())
        {
            
        }
    } 
    
    public Level(IEnumerable<Vector2Int> blockPositions, IEnumerable<Vector2Int> targetPositions) 
    {
        this.blockPositions = blockPositions.ToList();
        this.targetPositions = targetPositions.ToList();
        //compare max block x, y and max target x, y, then (smallest is zero)
    }
    
    private static string Base64Encode(string plainText) 
    {
        var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
        return System.Convert.ToBase64String(plainTextBytes);
    }
    
    private static string Base64Decode(string base64EncodedData) 
    {
        var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
        return Encoding.UTF8.GetString(base64EncodedBytes);
    }


    private static bool ValidPosition(Vector2Int position)
    {
        return position.x < 0 || position.y < 0;
    }
    
    private static bool Add(Vector2Int position, IList<Vector2Int> list)
    {
        if (list.Contains(position) || !ValidPosition(position))
        {
            return false;
        }
        list.Add(position);
        return true;
    }

    public bool AddBlock(Vector2Int position)
    {
        return Add(position, BlockPositions);
    }

    public bool AddTarget(Vector2Int position)
    {
        return Add(position, TargetPositions);
    }

    public bool AddBlock(int x, int y)
    {
        return AddBlock(new Vector2Int(x, y));
    }

    public bool AddTarget(int x, int y)
    {
        return AddTarget(new Vector2Int(x, y));
    }

    public void RemoveBlock(int x, int y)
    {
        BlockPositions.Remove(new Vector2Int(x, y));
    }

    public void RemoveTarget(int x, int y)
    {
        TargetPositions.Remove(new Vector2Int(x, y));
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