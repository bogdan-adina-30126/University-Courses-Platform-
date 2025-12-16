using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace desktop_client
{
    internal class Service
    {
        private readonly HttpClient client;

        public Service()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:8083/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // Metodă pentru a lua toate cursurile din backend
        public async Task<List<Course>> GetCoursesAsync()
        {
            HttpResponseMessage response = await client.GetAsync("courses/all");
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                var courses = JsonSerializer.Deserialize<List<Course>>(json,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                return courses ?? new List<Course>();
            }
            return new List<Course>();
        }

        // Metodă pentru a adăuga student la un curs în backend
        public async Task<bool> AddStudentToCourseAsync(int courseId, Student student)
        {
            string json = JsonSerializer.Serialize(student);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            // endpoint-ul trebuie să existe în backend
            HttpResponseMessage response = await client.PostAsync($"courses/{courseId}/students/add", content);

            return response.IsSuccessStatusCode;
        }
        // Metodă pentru a lua toate departamentele
        public async Task<List<Department>> GetDepartmentsAsync()
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync("departments/all");
                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();
                    
                    // Debug: afișează JSON-ul primit
                    System.Diagnostics.Debug.WriteLine($"JSON received: {json}");
                    
                    var options = new JsonSerializerOptions 
                    { 
                        PropertyNameCaseInsensitive = true,
                        NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString
                    };
                    
                    var departments = JsonSerializer.Deserialize<List<Department>>(json, options);
                    
                    // Debug: afișează câte departamente s-au găsit
                    System.Diagnostics.Debug.WriteLine($"Departments loaded: {departments?.Count ?? 0}");
                    
                    return departments ?? new List<Department>();
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine($"HTTP Error: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error in GetDepartmentsAsync: {ex.Message}");
                throw; // Re-throw pentru a fi prins în Form1
            }
            return new List<Department>();
        }

        // Metodă pentru a lua cursurile după departmentId
        public async Task<List<Course>> GetCoursesByDepartmentAsync(int departmentId)
        {
            HttpResponseMessage response = await client.GetAsync($"departments/{departmentId}/courses");
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                var courses = JsonSerializer.Deserialize<List<Course>>(json,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                return courses ?? new List<Course>();
            }
            return new List<Course>();
        }


        public async Task<List<Student>> GetStudentsByCourseId(int courseId)
        {
            HttpResponseMessage response = await client.GetAsync($"students/course/{courseId}");
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                var students = JsonSerializer.Deserialize<List<Student>>(json,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                return students ?? new List<Student>();
            }

            return new List<Student>();
        }


    }
}
