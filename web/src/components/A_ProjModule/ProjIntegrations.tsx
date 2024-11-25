import { useEffect, useState } from 'react'
import { Facebook, Instagram, Twitter, Search, Settings, Bell, Plus, Download, ExternalLink } from 'lucide-react';


const ProjectIntegrationsHome = ({
  setisImportLeadsOpen,
  selUserProfileF,
  taskType,
}) => {
  // change navbar title
  // useTitle('Data Table V1')
  const [activeTab, setActiveTab] = useState('Active');
  const tabs = ['View all', 'Active', 'Inactive', 'Custom'];

  const socialCards = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-8 h-8 text-blue-600" />,
      url: 'facebook.com',
      description: 'Connect with your audience through the world\'s largest social network platform.',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-8 h-8 text-pink-600" />,
      url: 'instagram.com',
      description: 'Share visual stories and engage with your community through photos and videos.',
      bgColor: 'bg-pink-50',
      iconBg: 'bg-pink-100'
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-8 h-8 text-gray-800" />,
      url: 'x.com',
      description: 'Engage in real-time conversations and share updates with your followers.',
      bgColor: 'bg-gray-50',
      iconBg: 'bg-gray-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 mt-2 mr-2 rounded-xl">
      {/* Navigation Bar */}




      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Integrations & workflows</h1>
            <p className="text-gray-600">Supercharge your workflow and connect the tools you and your team uses every day.</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              <Plus className="w-4 h-4 mr-2" />
              Create Integration
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 mb-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab === 'Active' && (
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search integrations..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialCards.map((card) => (
            <div
              key={card.name}
              className={`${card.bgColor} rounded-xl p-6 transition-transform hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${card.iconBg} p-3 rounded-xl`}>
                  {card.icon}
                </div>
                <button className="text-gray-600 hover:text-gray-900">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <div className="flex items-center justify-between">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </button>
                <div className="w-11 h-6 bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300">
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm transform duration-300 ease-in-out"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProjectIntegrationsHome
