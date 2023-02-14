using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PromotIt.Model
{
    public class SocialActivist
    {
        public string UserID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public decimal EarningStatus { get; set; }
        public string TwitterHandle { get; set; }
        public DateTime LastEarningsUpdate { get; set; }

    }
}
