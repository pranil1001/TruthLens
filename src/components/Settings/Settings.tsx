import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Monitor, Bell, Cpu, Lock, Globe } from 'lucide-react';

interface SettingItemProps {
  icon: React.ElementType;
  label: string;
  description: string;
  children: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, label, description, children }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-200">
    <div className="p-2 rounded-lg bg-slate-500/10 text-slate-400">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-200">{label}</h4>
        {children}
      </div>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
  </div>
);

interface SettingsProps {
  onBack: () => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (val: boolean) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  onBack,
  theme,
  setTheme,
  notificationsEnabled,
  setNotificationsEnabled
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 z-50 bg-[#0A0F1D] overflow-y-auto p-4"
    >
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-slate-100">Settings</h2>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">Appearance</h3>
          <div className="space-y-3">
            <SettingItem
              icon={Moon}
              label="Theme"
              description="Choose how TruthLens looks on your screen."
            >
              <div className="flex items-center gap-1 p-1 rounded-lg bg-black/20 border border-white/10">
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                      theme === t
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </SettingItem>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">Notifications</h3>
          <div className="space-y-3">
            <SettingItem
              icon={Bell}
              label="Push Notifications"
              description="Get alerted when a highly misleading article is detected."
            >
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-10 h-5 rounded-full relative transition-all duration-200 ${
                  notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                  notificationsEnabled ? 'left-6' : 'left-1'
                }`} />
              </button>
            </SettingItem>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">AI Configuration</h3>
          <div className="space-y-3">
            <SettingItem
              icon={Cpu}
              label="Model Precision"
              description="Adjust the balance between speed and analysis depth."
            >
              <select className="bg-black/20 border border-white/10 text-slate-300 text-[10px] rounded-md px-2 py-1 outline-none">
                <option>Balanced</option>
                <option>Fast</option>
                <option>Deep Analysis</option>
              </select>
            </SettingItem>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">Privacy & Data</h3>
          <div className="space-y-3">
            <SettingItem
              icon={Lock}
              label="Local Storage"
              description="Store analysis history locally on your device."
            >
              <button
                className={`w-10 h-5 rounded-full relative bg-emerald-500`}
              >
                <div className="absolute top-1 left-6 w-3 h-3 bg-white rounded-full" />
              </button>
            </SettingItem>
            <SettingItem
              icon={Globe}
              label="Anonymous Feedback"
              description="Help improve the AI by sharing anonymized results."
            >
              <button
                className={`w-10 h-5 rounded-full relative bg-slate-600`}
              >
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full" />
              </button>
            </SettingItem>
          </div>
        </section>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-[10px] text-slate-500">TruthLens v1.0.0 • Built for Truth</p>
      </div>
    </motion.div>
  );
};
