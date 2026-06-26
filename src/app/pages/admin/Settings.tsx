import { Helmet } from "react-helmet-async";

export function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings | Admin Portal</title>
      </Helmet>

      <div className="space-y-6">
        <h1 className="font-poppins font-bold text-2xl text-foreground">Store Settings</h1>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 max-w-3xl">
          <form className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-poppins font-bold text-lg text-foreground border-b border-border pb-2">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Store Name</label>
                  <input type="text" defaultValue="SKML Mobiles" className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Store Logo URL</label>
                  <input type="text" defaultValue="/logo.png" className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Support Email</label>
                  <input type="email" defaultValue="support@skmlmobiles.com" className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Support Phone</label>
                  <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Store Address</label>
                  <textarea rows={3} className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" defaultValue="123 Mobile Street, Tech City, India"></textarea>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-poppins font-bold text-lg text-foreground border-b border-border pb-2">Financial Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Currency</label>
                  <select className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tax Rate (%)</label>
                  <input type="number" defaultValue={18} className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Base Shipping Charge (₹)</label>
                  <input type="number" defaultValue={50} className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button type="button" className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
