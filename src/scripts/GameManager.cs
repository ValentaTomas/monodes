using UnityEditor;
using UnityEngine;
using UnityEngine.Experimental.UIElements;

public class GameManager : MonoBehaviour
{
    public static GameManager instance;
    private BoardManager boardScript;
    public GameObject completePrefab;
    private int level;
    public GameObject UICanvas;
    public GameObject UndoButton;

    private void Awake()
    {
        if (instance == null)
            instance = this;
        else if (instance != this) Destroy(gameObject);
        DontDestroyOnLoad(gameObject);
        boardScript = GetComponent<BoardManager>();
        InitGame();
    }

    private void UpdateUndoButton(object sender, UndoChangeArgs args)
    {
            //UndoButton.GetComponent<Button>().SetEnabled(args.IsUndoable);
    }
    
    public void UndoTurn()
    {
        boardScript.Undo(1);
    }

    private void InitGame()
    {
        boardScript.OnUndoChange += UpdateUndoButton;
        boardScript.Setup(Levels.Layout[level].Blocks, Levels.Layout[level].Targets);
        Camera.main.transform.position = new Vector3(boardScript.Rows / 2f, boardScript.Columns / 2f - 1, -10f);
    }

    public void NextLevel()
    {
        var uiCanvas = UICanvas.transform.Find("ControlUI");
        uiCanvas.gameObject.SetActive(false);
        boardScript.BoardContainer.GetComponent<CanvasGroup>().alpha = 0;
        var complete = Instantiate(completePrefab, transform.position, Quaternion.identity);
        complete.GetComponent<Transform>().SetParent(UICanvas.GetComponent<Transform>());
        complete.GetComponent<Fade>().FadeInOut();
        level++;
        if (level >= Levels.Layout.Count) Application.Quit();
        InitLevel(level);
        Destroy(complete);
        boardScript.BoardContainer.GetComponent<CanvasGroup>().alpha = 1;
        uiCanvas.gameObject.SetActive(true);
    }

    public void InitLevel(int level)
    {
        boardScript.Setup(Levels.Layout[level].Blocks, Levels.Layout[level].Targets);
        Camera.main.transform.position = new Vector3(boardScript.Rows / 2f, boardScript.Columns / 2f - 1, -10f);
    }


    public void ResetLevel()
    {
        boardScript.Setup(Levels.Layout[level].Blocks, Levels.Layout[level].Targets);
    }
}