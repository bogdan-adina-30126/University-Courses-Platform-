namespace desktop_client
{
    class Department
    {
        public int? Id { get; set; }  // Nullable pentru siguranță
        public string Name { get; set; } = ""; // inițializare implicită

        public Department() { }

        public Department(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
