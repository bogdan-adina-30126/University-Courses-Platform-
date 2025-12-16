namespace desktop_client
{
    public class Course
    {
        public int? Id { get; set; }  // Nullable pentru siguranță
        public string Name { get; set; } = "";
        public int? DepartmentId { get; set; }  // Nullable - poate fi null în JSON

        // Lista de studenți pentru acest curs
        public List<Student>? Students { get; set; } = new List<Student>();

        public Course() { } // constructor gol

        public Course(int id, string name, int departmentId)
        {
            Id = id;
            Name = name;
            DepartmentId = departmentId;
        }
    }
}
