
    public static Vector3 ToVector3(this Vector2Int vector)
    {
        return new Vector3(vector.x, vector.y, 0f);
    }

    public static Vector3 ToVector3(this Vector2Int vector, float x = 0f, float y = 0f, float z = 0f)
    {
        return new Vector3(vector.x + x, vector.y + y, 0f + z);
    }
