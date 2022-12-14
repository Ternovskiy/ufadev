using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParadigmsController : ControllerBase
    {
        public ParadigmsController()
        {
        }

        [HttpGet]
        public IEnumerable<Paradigm> Get()
        {
            return new[]
            {
                new Paradigm()
                {
                    Id = 1,
                    Name = "Императивное программирование",
                    Description = @"Парадигма программирования (стиль написания исходного кода компьютерной программы), для которой характерно следующее:
в исходном коде программы записываются инструкции (команды);
инструкции должны выполняться последовательно;
данные, получаемые при выполнении предыдущих инструкций, могут читаться из памяти последующими инструкциями;
данные, полученные при выполнении инструкции, могут записываться в память.",
                },
                new Paradigm()
                {
                    Id = 2,
                    Name = "Декларативное программирование",
                    Description = @"Парадигма программирования, в которой задаётся спецификация решения задачи, то есть описывается ожидаемый результат, 
а не способ его получения. Противоположностью декларативного является императивное программирование, при котором на том или ином уровне детализации 
требуется описание последовательности шагов для решения задачи. В качестве примеров декларативных языков обычно приводят HTML и SQL.",
                },
                new Paradigm()
                {
                    Id = 3,
                    Name = "Реактивное программирование",
                    Description = @"Парадигма программирования, ориентированная на потоки данных и распространение изменений. Это означает, что должна 
существовать возможность легко выражать статические и динамические потоки данных, а также то, что нижележащая модель исполнения должна автоматически 
распространять изменения благодаря потоку данных.",
                },
                new Paradigm()
                {
                    Id = 4,
                    Name = "Структурное программирование",
                    Description = @"Парадигма программирования, в основе которой лежит представление программы в виде иерархической структуры блоков. 
Концептуализирована в конце 1960-х — начале 1970-х годов на фундаменте теоремы Бёма — Якопини, математически обосновывающей возможность структурной 
организации программ, и работы Эдсгера Дейкстры «О вреде оператора goto» (англ. Goto considered harmful).",
                },
                new Paradigm()
                {
                    Id = 5,
                    Name = "Функциональное программирование",
                    Description = @"Парадигма программирования, в которой процесс вычисления трактуется как вычисление значений функций в математическом 
понимании последних (в отличие от функций как подпрограмм в процедурном программировании).",
                },
                new Paradigm()
                {
                    Id = 6,
                    Name = "Логическое программирование",
                    Description = @"Парадигма программирования, основанная на математической логике — программы в ней задаются в форме логических 
утверждений и правил вывода. Наиболее известный язык логического программирования — Пролог.",
                },
                new Paradigm()
                {
                    Id = 7,
                    Name = "Объектно-ориентированное программирование",
                    Description = @"Методология программирования, основанная на представлении программы в виде совокупности взаимодействующих объектов, 
каждый из которых является экземпляром определённого класса, а классы образуют иерархию наследования.",
                },
                new Paradigm()
                {
                    Id = 8,
                    Name = "Событийно-ориентированное программирование",
                    Description = @"Парадигма программирования, в которой выполнение программы определяется событиями — действиями пользователя (клавиатура, 
мышь, сенсорный экран), сообщениями других программ и потоков, событиями операционной системы (например, поступлением сетевого пакета).
",
                },

            };
        }
    }

    public class Paradigm
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}