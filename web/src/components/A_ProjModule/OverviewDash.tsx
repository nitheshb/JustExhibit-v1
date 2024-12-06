import React from 'react';
import { Globe } from 'lucide-react';
import { Facebook, Pinterest, Twitter } from '@mui/icons-material';
import { ConversionChart } from './ConversionChart';
import DashboardStats from './DashboardStats';


const socialReferrals = [
  { icon: <Facebook className="w-4 h-4 text-blue-600" />, name: "Facebook", percentage: "8%", visitors: "10 visitors" },
  { icon: <Twitter className="w-4 h-4 text-blue-400" />, name: "Twitter", percentage: "0%", visitors: "0 visitors" },
  { icon: <Pinterest className="w-4 h-4 text-red-600" />, name: "Pinterest", percentage: "0%", visitors: "0 visitors" },
  { icon: <Facebook className="w-4 h-4 text-blue-600" />, name: "Instagram", percentage: "12%", visitors: "20 visitors" },
];

const topCountries = [
  { country: 'United States', percentage: '78%', count: '150' },
  { country: 'Canada', percentage: '7%', count: '17' },
  { country: 'Russia', percentage: '4%', count: '10' },
  { country: 'India', percentage: '3%', count: '8' },
  { country: 'Australia', percentage: '2%', count: '5' },
];

const topReferrers = [
  { site: 'm.facebook.com', percentage: '16%', count: '6' },
  { site: 'www.facebook.com', percentage: '11%', count: '4' },
  { site: 'josephrog.com', percentage: '3%', count: '1' },
  { site: 'twitter.com', percentage: '2%', count: '1' },
  { site: 'linkedin.com', percentage: '1%', count: '1' },
];

const topSearchTerms = [
  { term: 'joseph regucci', percentage: '25%', count: '1' },
  { term: 'josephrog.net', percentage: '25%', count: '1' },
  { term: 'prosperity buddha...', percentage: '25%', count: '1' },
  { term: 'social media trends', percentage: '15%', count: '1' },
  { term: 'marketing tips', percentage: '10%', count: '1' },
];

function StatCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-gray-700">{title}</h2>
        <span className="text-xs text-gray-400">Today </span>
      </div>
      {children}
    </div>
  );
}

function OverviewDash() {
  return (
    <div className=" bg-gray-50 p-6">


<DashboardStats/>
     


<div className=" bg-gray-50 p-6">
  <div className="max-w-7xl mx-auto space-y-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard title="Conversions" className="col-span-1 md:col-span-2">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">0.33%</span>
                <span className="text-xs text-green-500">+0.33%</span>
              </div>
              <p className="text-xs text-gray-500">Added to Cart</p>
              <p className="text-xs text-gray-400">10 customers</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">0.33%</span>
                <span className="text-xs text-red-500">-0.5%</span>
              </div>
              <p className="text-xs text-gray-500">Reached Checkout</p>
              <p className="text-xs text-gray-400">2 customers</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">0%</span>
                <span className="text-xs text-gray-500">+0%</span>
              </div>
              <p className="text-xs text-gray-500">Purchased</p>
              <p className="text-xs text-gray-400">0 customers</p>
            </div>
          </div>
          <ConversionChart />
        </div>
      </StatCard>





      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        
      <StatCard title="Top Products">
        <div className="space-y-3">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Muscles Leggings</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">4 sold</span>
              </div>
            </div>
          ))}
        </div>
      </StatCard>








            <StatCard title="Traffic Sources">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Direct</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">88%</span>
              <span className="text-xs text-gray-400">995 visitors</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Referrals</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">7%</span>
              <span className="text-xs text-gray-400">74 visitors</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Search Engines</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">5%</span>
              <span className="text-xs text-gray-400">60 visitors</span>
            </div>
          </div>
        </div>
      </StatCard>
      </div>




    </div>
  </div>
</div>



{/* third cards */}









        
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Social Referrals */}
        <StatCard title="Social Referrals">
          <div className="space-y-3">
            {socialReferrals.map((social, index) => (
              <div key={index} className="flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  {social.icon}
                  <span className="text-sm text-gray-600">{social.name}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xl font-medium">{social.percentage}</span>
                  <span className="text-xs text-gray-400">{social.visitors}</span>
                </div>
              </div>
            ))}
          </div>
        </StatCard>

        {/* Top Countries */}
        <StatCard title="Top Countries">
          <div className="space-y-3">
            {topCountries.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{item.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.percentage}</span>
                  <span className="text-xs text-gray-400">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </StatCard>

        {/* Top Referrers */}
        <StatCard title="Top Referrers">
          <div className="space-y-3">
            {topReferrers.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                    {item.site}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.percentage}</span>
                  <span className="text-xs text-gray-400">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </StatCard>

        {/* Top Search Terms */}
        <StatCard title="Top Search Terms">
          <div className="space-y-3">
            {topSearchTerms.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                    {item.term}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.percentage}</span>
                  <span className="text-xs text-gray-400">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </StatCard>
      </div>










    
    </div>
  );
}

export default OverviewDash;
