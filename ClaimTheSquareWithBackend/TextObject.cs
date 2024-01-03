namespace ClaimTheSquareWithBackend
{
    public class TextObject
    {
        public int Index { get; set; }
        public string Text { get; set; }
        public string ForeColor { get; set; }
        public string BackColor { get; set; }

        public TextObject(int index, string text, string foreColor, string backColor)
        {
            Index = index;
            Text = text;
            ForeColor = foreColor;
            BackColor = backColor;
        }

        public TextObject()
        {
            
        }
    }
}
