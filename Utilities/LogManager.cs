
using System.Data.SqlClient;

namespace Utilities
{


    public interface ILogger
    {
        void Init();
        void LogEvent(string msg);
        void LogException(string msg, Exception exce);
        void LogCheckHouseKeeping();
    }

    public class LogFile : ILogger
    {
        public LogFile(){
            Init();
        }
        private static int fileCounter = 1;
		private static string Path = @"" + Environment.GetEnvironmentVariable("LogFolderPath") + @"\PromotIt\Logs\";
		private static string FileName = "Log" + fileCounter + "";
        private static string FileExtension = ".txt";
        private static string FullPath = Path + FileName + FileExtension;
        

        public void Init()
        {
            
           
        }
       
        public void LogEvent(string message)
        {
            LogItem logItem = new LogItem("Event", message, DateTime.Now, null);
                   
            LogManager.logQueue.Enqueue(logItem);       
        }

        public void LogException(string msg, Exception ex)
        {
            LogItem logItem = new LogItem("Exception", msg, DateTime.Now, ex.Message);
                     
            LogManager.logQueue.Enqueue(logItem);

        }


        public void LogCheckHouseKeeping()
        {
            while (File.Exists(FullPath))
            {
                // if the file already exists, increment the file counter and update the file name
                if (new FileInfo(FullPath).Length / 1024 / 1024 >= 1)
                {
                    fileCounter++;
                    FileName = "Log" + fileCounter + "";
                    FullPath = Path + FileName + FileExtension;
                }
                else
                {
                    break;
                }
            }
        }

        public static void InsertToLog(LogItem logItem)
        {
            string message = logItem.DateTime + "-" + logItem.Type + "-" + logItem.Message + "-" + logItem.Exception + "\n";
            // Append the message to the log file
            File.AppendAllText(FullPath, message);
        }

    }

    public class LogConsole : ILogger
    {
        //Queue<LogItem> logQueue;
        public LogConsole()
        {
            Init();
        }
        public void Init()
        {
            //logQueue = new Queue<LogItem>();
            //Task.Run(() =>
            //{
            //    while (true)
            //    {
            //        if (logQueue.Count > 0)
            //        {
            //            LogItem item = logQueue.Dequeue();
            //            InsertToLog(item);
            //            // save item to file takes 11 second
            //            System.Threading.Thread.Sleep(5000);

            //        }

            //        System.Threading.Thread.Sleep(1000);
            //    }

            //});
            //Task.Run(() =>
            //{
            //    while (true)
            //    {
            //        LogCheckHouseKeeping();
            //        System.Threading.Thread.Sleep(1000);
            //    }
            //});
        }

        public void LogEvent(string msg)
        {
            LogItem logItem = new LogItem("Event", msg, DateTime.Now, null);
            LogManager.logQueue.Enqueue(logItem);
        }

        public void LogException(string msg, Exception ex)
        {
            LogItem logItem = new LogItem("Exception", msg, DateTime.Now, ex.Message);
            LogManager.logQueue.Enqueue(logItem);
        }

        public void LogCheckHouseKeeping()
        {

        }

        public static void InsertToLog(LogItem logItem)
        {
            string message = logItem.DateTime + "-" + logItem.Type + "-" + logItem.Message + "-" + logItem.Exception + "\n";
            // Append the message to the log file
            Console.WriteLine(message);
        }
    }

    public class LogDB : ILogger
    {
        public LogDB()
        {
            Init();
        }
        private static string connectionString = @"Data Source=localhost\SQLEXPRESS;Initial Catalog=Northwind;Integrated Security=True";

        //Queue<LogItem> logQueue;
              
        public void Init()
        {
            //logQueue = new System.Collections.Generic.Queue<LogItem>();
            // Task.Run(() =>
            // {
            //     while (true)
            //     {
            //         if (logQueue.Count > 0)
            //         {
            //             LogItem item = logQueue.Dequeue();
            //              InsertToLog(item);
            //             // save item to file takes 11 second
            //             System.Threading.Thread.Sleep(11000);

            //         }

            //         System.Threading.Thread.Sleep(1000);
            //     }

            // });
         
        }
        public void LogEvent(string msg)
        {
            LogItem logItem = new LogItem("Event", msg, DateTime.Now, null);
            //logQueue.Enqueue(logItem);
            LogManager.logQueue.Enqueue(logItem);
        }

        public void LogException(string msg, Exception ex)
        {
            LogItem logItem = new LogItem("Exception", msg, DateTime.Now, ex.Message);
            //logQueue.Enqueue(logItem);
            LogManager.logQueue.Enqueue(logItem);
        }
        public void LogCheckHouseKeeping()
        {

        }
        
        public static void InsertToLog(LogItem logItem)
        {
            if (logItem.Exception != null)
            {
                logItem.Exception = "'" + logItem.Exception + "'";
            }
            else
            {
                logItem.Exception = "NULL";
            }
            string timeToDB = logItem.DateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
            // Write the message to the log table
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand($"INSERT INTO Logs (Type, Message, Exception, DateTime) values ('{logItem.Type}','{logItem.Message}',{logItem.Exception},'{timeToDB}')", connection);

                connection.Open();
                command.ExecuteNonQuery();
            }

        }
    }

    public class LogNone : ILogger
    {
        public void Init()
        {

        }

        public void LogEvent(string msg)
        {

        }

        public void LogException(string msg, Exception ex)
        {
        }
        public void LogCheckHouseKeeping()
        {
        }
    }
    
    public class LogItem
    {
        public LogItem(string type, string message, DateTime dateTime, string? exception)
        {
            Type = type;
            Message = message;
            DateTime = dateTime;
            if (exception == null)
            {
                exception = "";
            }
            Exception = exception;
        }
        public DateTime DateTime { get; set; }
        public string Exception { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
    }
    public class LogManager
    {
        
        public static ILogger logger;

        public static Queue<LogItem> logQueue;

        public enum LogType
        {
            File,
            Console,
            DB,
        }
        
        public void Init(LogType type)
        {
            logQueue = new Queue<LogItem>();
            switch (type)
            {
                case LogType.File:
                    logger = new LogFile();
                  
                    break;
                case LogType.Console:
                    logger = new LogConsole();
                  
                    break;
                case LogType.DB:
                    logger = new LogDB();
                   
                    break;
                default:
                    logger = new LogNone();
                   
                    break;
            }
            Task.Run(() =>
            {
                while (true)
                {
                    if (logQueue.Count > 0)
                    {                       
                        LogItem item = logQueue.Dequeue();
                        if (item != null) {                     
                            InsertToLog(item, type);
                        }
                        // save item to file takes 11 second
                        System.Threading.Thread.Sleep(5000);

                    }

                    System.Threading.Thread.Sleep(1000);
                }

            });

            Task.Run(() =>
           {
               while (true)
               {
                   logger.LogCheckHouseKeeping();
                   System.Threading.Thread.Sleep(100000);
               }
           });
        }


public void LogEvent(string msg)
        {
            logger.LogEvent(msg);
        }
        public void LogException(string msg, Exception ex)
        {
            logger.LogException(msg, ex);
        }
        
        public static void InsertToLog(LogItem logItem, LogType type)
        {
            switch (type)
            {
                case LogType.File:
                    LogFile.InsertToLog(logItem);
                    break;
                case LogType.Console:
                    LogConsole.InsertToLog(logItem);
                    break;
                case LogType.DB:
                    LogDB.InsertToLog(logItem);
                    break;
                default:
                    break;
            }
        }

        public void LogCheckHouseKeeping()
        {
            logger.LogCheckHouseKeeping();
        }
    }
}