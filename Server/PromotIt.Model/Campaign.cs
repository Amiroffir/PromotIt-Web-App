using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PromotIt.Model
{
    public class Campaign
    {
        public int id { get; set; }
        public string CampaignName { get; set; }
        public string CampaignDesc { get; set; }
        public string CampaignHash { get; set; }
        public string CampaignUrl { get; set; }
        public decimal DonationsAmount { get; set; }
        public string NonProfitRepID { get; set; }
        public string Image { get; set; }
    }
}
