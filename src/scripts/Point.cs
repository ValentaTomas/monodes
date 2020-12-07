using System.Collections.Generic;
using UnityEngine;

public class Point : Zone
{
    private BoardManager boardScript;
    public IList<Block> Blocks { get; set; }
    public IList<GameObject> Lines { get; set; } = new List<GameObject>();

    public void AddLine(GameObject linePrefab, Vector3 position)
    {
        var line = Instantiate(linePrefab, position, Quaternion.identity);
        line.transform.SetParent(gameObject.transform);
        Lines.Add(line);
    }

    private void Awake()
    {
        boardScript = GameObject.FindWithTag("GameController").GetComponent<BoardManager>();
    }

    private void OnMouseDown()
    {
        boardScript.Trigger(this);
    }
}