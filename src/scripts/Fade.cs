using UnityEngine;
using UnityEngine.UI;

public class Fade : MonoBehaviour
{
    public void FadeInOut()
    {
        gameObject.GetComponent<Text>().CrossFadeAlpha(0.0f, 0.05f, false);
        gameObject.GetComponent<Text>().CrossFadeAlpha(1.0f, 0.05f, false);
    }
}