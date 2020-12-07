using System.Collections.Generic;

internal class DropOutStack<T>
{
    private readonly int capacity;
    private LinkedList<T> items = new LinkedList<T>();

    public DropOutStack(int capacity)
    {
        this.capacity = capacity;
    }

    public void Push(T item)
    {
        items.AddFirst(item);
        if (items.Count > capacity) items.RemoveLast();
    }

    public bool TryPop(out T result)
    {
        result = default(T);
        var first = items.First;
        if (first == null)
        {
            return false;
        }
        result = first.Value;
        items.RemoveFirst();
        return true;
    }

    public bool TryDeepPop(int index, out T result)
    {
        result = default(T);
        if (index > items.Count) return false;

        for (var i = 0; i < index; i++) TryPop(out result);

        return true;
    }

    public int Count => items.Count;
    
}