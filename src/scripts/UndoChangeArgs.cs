using System;

public class UndoChangeArgs : EventArgs
{
    public bool IsUndoable { get; private set; }

    public UndoChangeArgs(bool isUndoable)
    {
        IsUndoable = isUndoable;
    }
}