using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PromotIt.Model
{
    public class Product
    {
        public int ProductSerialNumber { get; set; }
        public string ProductID { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public string DonatedBy { get; set; }
        public string DonatedTo { get; set; }
        public bool IsBought { get; set; }
        public string BuyerID { get; set; }
        public string IsDelivered { get; set; }
        public string Image { get; set; }

    }
}
