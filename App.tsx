
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, 
  Plus, 
  Trash2, 
  ChevronRight, 
  CheckCircle2, 
  Clock,
  HardHat,
  Truck,
  Box,
  MapPin,
  X,
  CloudSync,
  Loader2,
  User,
  Settings as SettingsIcon,
  ChevronDown,
  Info,
  Layers,
  ArrowRight,
  Database,
  ArrowLeft,
  Plus as PlusIcon,
  Lock,
  Unlock,
  Globe,
  ClipboardList,
  Activity,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Send,
  ArrowUpRight,
  Mail,
  FileText,
  ShieldCheck,
  Zap,
  HelpCircle,
  Briefcase,
  PenTool
} from 'lucide-react';
import { InterfaceType, ActivityRecord, Machinery, Manpower, Material, DropdownData, ActivityOption } from './types';
import { storageService } from './services/storageService';
import { DEFAULT_DROPDOWN_DATA } from './constants';

const ADMIN_PIN = "1234";
const DEFAULT_SYNC_URL = ""; 

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const formatChainageDisplay = (val: string) => {
  if (!val) return '';
  const clean = val.replace(/\+/g, '');
  if (isNaN(Number(clean))) return val;
  const parts = clean.split('.');
  const whole = parts[0];
  const decimal = parts[1] ? `.${parts[1]}` : '';
  if (whole.length <= 3) return `0+${whole.padStart(3, '0')}${decimal}`;
  const km = whole.slice(0, -3);
  const m = whole.slice(-3);
  return `${km}+${m}${decimal}`;
};

const SmartSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  label, 
  autoFocus = false,
  themeColor = 'blue'
}: { 
  options: (string | ActivityOption)[], 
  value: string, 
  onChange: (val: string, extra?: ActivityOption) => void, 
  placeholder: string, 
  label: string,
  autoFocus?: boolean,
  themeColor?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setQuery(value); }, [value]);
  
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { 
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false); 
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option => {
    const text = typeof option === 'string' ? option : `${option.boqItem} ${option.activityCode} ${option.description}`;
    return text.toLowerCase().includes(query.toLowerCase());
  });

  const focusBorderClass = themeColor === 'violet' ? 'focus:border-violet-500/50' : 'focus:border-blue-500/50';
  const textHighlightClass = themeColor === 'violet' ? 'text-violet-400' : 'text-blue-400';
  const hoverBgClass = themeColor === 'violet' ? 'hover:bg-violet-600/10' : 'hover:bg-blue-600/10';

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[10px] font-black text-slate-300 mb-1 ml-1 uppercase tracking-[0.15em]">{label}</label>
      <div className="relative">
        <input 
          ref={inputRef}
          type="text" 
          value={query} 
          onChange={(e) => { setQuery(e.target.value); onChange(e.target.value); setIsOpen(true); }} 
          onFocus={() => setIsOpen(true)} 
          className={`w-full bg-slate-800 border-2 border-slate-700/50 p-3 pr-10 rounded-2xl ${focusBorderClass} outline-none transition-all font-bold text-slate-100 placeholder:text-slate-600 text-sm shadow-inner`} 
          placeholder={placeholder} 
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <ChevronDown className={`${isOpen ? 'rotate-180' : ''} transition-transform`} size={16} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-[200] mt-1 w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 max-h-[450px] overflow-y-auto py-2 ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-200">
          {filteredOptions.length > 0 ? filteredOptions.map((opt, i) => {
            const displayVal = typeof opt === 'string' ? opt : opt.description;
            return (
              <button key={i} type="button" onClick={() => { onChange(displayVal, typeof opt !== 'string' ? opt : undefined); setQuery(displayVal); setIsOpen(false); }} className={`w-full text-left px-4 py-3 ${hoverBgClass} transition-colors border-b border-slate-700/50 last:border-0`} >
                {typeof opt !== 'string' && (
                  <div className="flex gap-2 mb-0.5">
                    <span className={`text-[8px] font-black ${textHighlightClass} uppercase tracking-tighter`}>BOQ: {opt.boqItem}</span>
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Code: {opt.activityCode}</span>
                  </div>
                )}
                <div className={`font-bold text-[12px] ${value === displayVal ? textHighlightClass : 'text-slate-200'}`}>{displayVal}</div>
              </button>
            );
          }) : <div className="px-4 py-4 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">No matching items</div>}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<InterfaceType>('Progress');
  const [records, setRecords] = useState<ActivityRecord[]>([]);
  const [dropdowns, setDropdowns] = useState<DropdownData>(storageService.getDropdownData());
  const [isAdding, setIsAdding] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsCategory, setSettingsCategory] = useState<'Main' | 'Activities' | 'Machinery' | 'Materials' | 'Manpower' | 'Auth' | 'Sync' | 'Profile'>('Main');
  const [pinInput, setPinInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [syncUrl, setSyncUrl] = useState(localStorage.getItem('roadwise_sync_url') || DEFAULT_SYNC_URL);
  const [reportEmail, setReportEmail] = useState(localStorage.getItem('roadwise_report_email') || "");
  const [userName, setUserName] = useState(localStorage.getItem('last_user_name') || "");
  const [userDesignation, setUserDesignation] = useState(localStorage.getItem('roadwise_user_designation') || "Site In-Charge");
  
  const [newSettingVal, setNewSettingVal] = useState("");
  const [newActivity, setNewActivity] = useState({ boq: "", code: "", desc: "" });
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const [formData, setFormData] = useState<Partial<ActivityRecord>>({
    date: getCurrentDate(),
    userName: userName,
    startTime: getCurrentTime(),
    endTime: getCurrentTime(),
    startChainage: '24+950',
    endChainage: '28+180',
    side: 'B/S',
    machinery: [], manpower: [], materials: [], images: []
  });

  const themeColor = activeTab === 'Programme' ? 'violet' : 'blue';
  const themeBg = activeTab === 'Programme' ? 'bg-violet-600' : 'bg-blue-600';
  const themeText = activeTab === 'Programme' ? 'text-violet-400' : 'text-blue-400';
  const themeBorder = activeTab === 'Programme' ? 'border-violet-500' : 'border-blue-500';

  useEffect(() => { 
    setRecords(storageService.getRecords()); 
  }, []);

  const refreshList = () => {
    const data = storageService.getRecords();
    setRecords([...data]);
  };

  const handleChainageBlur = (field: 'startChainage' | 'endChainage', val: string) => {
    setFormData(prev => ({ ...prev, [field]: formatChainageDisplay(val) }));
  };

  const handleSave = () => {
    if (!formData.activity || !formData.userName || !formData.date) { alert("Work Date, Name and Activity are mandatory!"); return; }
    localStorage.setItem('last_user_name', formData.userName || '');
    const newRecord: ActivityRecord = {
      id: formData.id || Date.now().toString(),
      date: formData.date || getCurrentDate(),
      userName: formData.userName || '',
      type: activeTab,
      boqItem: formData.boqItem || 'N/A',
      activityCode: formData.activityCode || 'N/A',
      activity: formData.activity || '',
      side: formData.side as any || 'B/S',
      startChainage: formData.startChainage || '',
      endChainage: formData.endChainage || '',
      startTime: formData.startTime || getCurrentTime(),
      endTime: formData.endTime || getCurrentTime(),
      machinery: formData.machinery as any || [],
      manpower: formData.manpower as any || [],
      materials: formData.materials as any || [],
      images: formData.images || [],
      status: 'draft',
      timestamp: Date.now()
    };
    storageService.saveRecord(newRecord);
    refreshList();
    setIsAdding(false);
    setCurrentStep(0);
  };

  const handleConvertToProgress = (progRecord: ActivityRecord) => {
    const newRecord: ActivityRecord = {
      ...progRecord,
      id: Date.now().toString(),
      type: 'Progress',
      date: getCurrentDate(),
      status: 'draft',
      timestamp: Date.now()
    };
    storageService.saveRecord(newRecord);
    refreshList();
    setActiveTab('Progress');
    alert("Moved to Progress Logs!");
  };

  const updateDropdowns = (newData: DropdownData) => {
    setDropdowns(newData);
    storageService.saveDropdownData(newData);
  };

  const handleCloudSubmit = async (options: { sendEmail?: boolean } = {}) => {
    const targetSheet = activeTab === 'Programme' ? 'Programme Log' : 'Progress Log';
    const unsubmitted = records.filter(r => r.status === 'draft' && r.type === activeTab);

    if (unsubmitted.length === 0) { 
      alert(`No new ${activeTab} records to sync.`); 
      return; 
    }
    
    if (!syncUrl) { 
      alert("Settings වෙත ගොස් Google Script URL එක ඇතුළත් කරන්න."); 
      return; 
    }
    
    setIsSubmitting(true);
    try {
      const payload = {
        sheetName: targetSheet,
        records: unsubmitted,
        email: reportEmail,
        designation: userDesignation,
        requestEmailReport: options.sendEmail || false,
        syncType: activeTab,
        timestamp: new Date().toISOString()
      };

      await fetch(syncUrl, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: JSON.stringify(payload) 
      });

      storageService.markAsSubmitted(unsubmitted.map(r => r.id));
      refreshList();
      
      if (options.sendEmail) {
        alert(`Cloud Sync Success! වාර්තාව සහ ඩිජිටල් අත්සන ${reportEmail} වෙත යවන ලදී.`);
      } else {
        alert(`Successfully synced ${unsubmitted.length} records!`);
      }
    } catch (e) {
      alert("Submission failed. URL එක පරීක්ෂා කරන්න.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestSync = async () => {
    if (!syncUrl) { alert("Enter URL!"); return; }
    setIsTesting(true);
    try {
      await fetch(syncUrl, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ test: true }) });
      alert("Test signal sent!");
    } catch (e) {
      alert("Test failed.");
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestEmailSync = async () => {
    if (!syncUrl || !reportEmail) { alert("URL සහ Email ඇතුළත් කරන්න."); return; }
    setIsTesting(true);
    try {
      const dummyPayload = {
        sheetName: "Connection Test",
        records: [{
          id: "test",
          date: getCurrentDate(),
          userName: userName || "Tester",
          activity: "Testing Excel Footer & Signature Appearance",
          boqItem: "TEST",
          activityCode: "00-00",
          side: "B/S",
          startChainage: "0+000",
          endChainage: "0+010",
          startTime: "00:00",
          endTime: "01:00",
          machinery: [], manpower: [], materials: []
        }],
        email: reportEmail,
        designation: userDesignation,
        requestEmailReport: true,
        syncType: "Test",
        timestamp: new Date().toISOString()
      };
      await fetch(syncUrl, { method: 'POST', mode: 'no-cors', body: JSON.stringify(dummyPayload) });
      alert(`Test වාර්තාව යවන ලදී. Excel එකේ Footer එක පරීක්ෂා කරන්න.`);
    } catch (e) {
      alert("Test failed.");
    } finally {
      setIsTesting(false);
    }
  };

  const addNewItemFromInputs = () => {
    if (settingsCategory === 'Activities') {
      if (!newActivity.boq || !newActivity.code || !newActivity.desc) return;
      const next = { ...dropdowns, activities: [...dropdowns.activities, { boqItem: newActivity.boq, activityCode: newActivity.code, description: newActivity.desc }] };
      updateDropdowns(next);
      setNewActivity({ boq: "", code: "", desc: "" });
    } else {
      if (!newSettingVal.trim()) return;
      const key = settingsCategory === 'Machinery' ? 'machineryTypes' : (settingsCategory === 'Materials' ? 'materials' : 'manpowerRoles');
      const next = { ...dropdowns, [key]: [...(dropdowns as any)[key], newSettingVal.trim()] };
      updateDropdowns(next);
      setNewSettingVal("");
    }
  };

  const filteredRecords = records.filter(r => r.type === activeTab).sort((a,b) => b.timestamp - a.timestamp);

  const steps = [
    { title: "Task", icon: <Layers size={14} /> },
    { title: "Staff", icon: <HardHat size={14} /> },
    { title: "Plant", icon: <Truck size={14} /> },
    { title: "Stock", icon: <Box size={14} /> },
    { title: "Review", icon: <CheckCircle2 size={14} /> }
  ];

  return (
    <div className={`min-h-screen bg-[#1e293b] text-slate-100 antialiased font-sans transition-colors duration-500`}>
      {/* MODAL OVERLAYS */}
      {confirmingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-8 max-w-sm w-full shadow-3xl text-center">
            <Trash2 size={32} className="text-red-500 mx-auto mb-4" />
            <h3 className="font-black text-xl mb-2 text-white uppercase tracking-tight">Delete Log?</h3>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setConfirmingId(null)} className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700">Cancel</button>
              <button onClick={() => { storageService.deleteRecord(confirmingId); refreshList(); setConfirmingId(null); }} className="flex-1 py-3 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {confirmingClear && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-8 max-w-sm w-full shadow-3xl text-center">
            <CloudSync size={32} className="text-amber-500 mx-auto mb-4" />
            <h3 className="font-black text-xl mb-2 text-white uppercase tracking-tight">Clear Synced?</h3>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setConfirmingClear(false)} className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={() => { storageService.clearSyncedRecords(); refreshList(); setConfirmingClear(false); }} className="flex-1 py-3 bg-amber-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Clear</button>
            </div>
          </div>
        </div>
      )}

      {showSetupGuide && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[400] overflow-y-auto p-6 flex flex-col items-center">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-[2.5rem] p-8 shadow-3xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-400" size={24}/>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">E-mail Setup Guide</h3>
              </div>
              <button onClick={() => setShowSetupGuide(false)} className="p-2 bg-white/5 rounded-full"><X size={20}/></button>
            </div>
            
            <div className="space-y-6 text-slate-300">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 font-black text-xs">1</div>
                <p className="text-[11px] leading-relaxed">Google Script Editor එකේ <b>function setup() {}</b> එක ඇතුළත් කර Run කරන්න.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 font-black text-xs">2</div>
                <p className="text-[11px] leading-relaxed"><b>Review Permissions</b> ක්ලික් කර ඔබගේ ගිණුම තෝරා <b>Allow</b> කරන්න.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 font-black text-xs">3</div>
                <p className="text-[11px] leading-relaxed"><b>Deploy -> New Deployment</b> ගොස් අලුත් URL එකක් ලබාගෙන එය ඇප් එකට ඇතුළත් කරන්න.</p>
              </div>
            </div>
            
            <button onClick={() => setShowSetupGuide(false)} className="w-full mt-8 bg-slate-100 text-slate-900 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest">සම්පූර්ණයි</button>
          </div>
        </div>
      )}

      <header className="bg-slate-800/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-4 sticky top-0 z-[100]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`${themeBg} p-2.5 rounded-[1.2rem] text-white shadow-lg transition-colors`}>
              <LayoutGrid size={22} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white leading-none">KAL - B 084</h1>
              <p className={`text-[8px] ${themeText} font-black uppercase tracking-[0.3em] mt-1 opacity-80 transition-colors`}>Project Manager</p>
            </div>
          </div>
          <button onClick={() => { setIsSettingsOpen(true); setSettingsCategory('Auth'); setPinInput(""); }} className="p-2 text-slate-400 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
            {isAuthenticated ? <Unlock size={18} className={themeText}/> : <Lock size={18} />}
          </button>
        </div>

        {!isAdding && !isSettingsOpen && (
          <div className="flex bg-black/20 p-1 rounded-[1.2rem] border border-white/5">
            {(['Progress', 'Programme'] as InterfaceType[]).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-[1rem] text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === tab ? `${tab === 'Progress' ? 'bg-blue-600' : 'bg-violet-600'} text-white shadow-md` : 'text-slate-500 hover:text-slate-300'}`}>
                {tab === 'Progress' ? <Activity size={14}/> : <ClipboardList size={14}/>}
                {tab}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6">
        {isSettingsOpen ? (
          <div className="bg-slate-800/80 border border-white/5 rounded-[2.5rem] p-6 shadow-3xl flex flex-col min-h-[550px]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {settingsCategory !== 'Main' && settingsCategory !== 'Auth' && (
                  <button onClick={() => setSettingsCategory('Main')} className="p-2 bg-white/5 rounded-full text-slate-400"><ArrowLeft size={18}/></button>
                )}
                <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{settingsCategory}</h2>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 text-slate-600 bg-white/5 rounded-full"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1">
              {settingsCategory === 'Auth' && (
                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                  <Lock size={40} className="text-amber-500"/>
                  <input type="password" value={pinInput} onChange={e => setPinInput(e.target.value)} placeholder="••••" className="w-32 text-center bg-black/30 border-2 border-slate-700 p-4 rounded-2xl text-2xl font-black text-white focus:border-blue-500 outline-none" maxLength={4} />
                  <button onClick={() => { if(pinInput === ADMIN_PIN) { setIsAuthenticated(true); setSettingsCategory('Main'); } else { alert("Wrong PIN"); setPinInput(""); } }} className={`w-full max-w-[180px] ${themeBg} text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-colors`}>Unlock</button>
                </div>
              )}

              {settingsCategory === 'Main' && isAuthenticated && (
                <div className="space-y-3">
                  {[
                    { cat: 'Profile', icon: <PenTool />, label: 'E-Signature Profile', color: 'emerald' },
                    { cat: 'Activities', icon: <Layers />, label: 'BOQ Codes', color: 'blue' },
                    { cat: 'Machinery', icon: <Truck />, label: 'Plant & Tools', color: 'amber' },
                    { cat: 'Materials', icon: <Box />, label: 'Stock Items', color: 'emerald' },
                    { cat: 'Manpower', icon: <HardHat />, label: 'Workforce', color: 'orange' },
                    { cat: 'Sync', icon: <Globe />, label: 'Cloud URL', color: 'indigo' }
                  ].map(item => (
                    <button key={item.cat} onClick={() => setSettingsCategory(item.cat as any)} className="w-full p-4 bg-white/5 border border-white/5 rounded-[1.8rem] flex items-center justify-between hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-${item.color}-500/10 text-${item.color}-400`}>{item.icon}</div>
                        <p className="text-[11px] font-black text-slate-200 uppercase tracking-widest">{item.label}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-600"/>
                    </button>
                  ))}
                  <button onClick={() => setIsAuthenticated(false)} className="w-full mt-6 p-4 border border-dashed border-white/5 rounded-[1.8rem] text-[9px] font-black text-slate-500 uppercase">Lock Admin</button>
                </div>
              )}

              {settingsCategory === 'Profile' && isAuthenticated && (
                <div className="space-y-5 animate-in slide-in-from-bottom-2">
                  <div className="p-5 bg-emerald-500/10 border border-emerald-500/10 rounded-[2rem] flex gap-4">
                     <PenTool className="text-emerald-400 shrink-0" size={24}/>
                     <div>
                       <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-1">E-Signature Profile</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed">මෙහි සේව් කරන නම සහ තනතුර Excel වාර්තාවේ යටින් (Footer) ඩිජිටල් අත්සන ලෙස භාවිතා වේ.</p>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">Full Name (Prepared By)</label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input type="text" value={userName} onChange={e => { setUserName(e.target.value); localStorage.setItem('last_user_name', e.target.value); }} placeholder="Enter your full name" className="w-full bg-black/30 border-2 border-slate-700 p-4 pl-12 rounded-2xl text-[11px] font-bold text-white outline-none focus:border-emerald-500" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">Official Designation</label>
                      <div className="relative">
                        <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input type="text" value={userDesignation} onChange={e => { setUserDesignation(e.target.value); localStorage.setItem('roadwise_user_designation', e.target.value); }} placeholder="e.g. Site Engineer" className="w-full bg-black/30 border-2 border-slate-700 p-4 pl-12 rounded-2xl text-[11px] font-bold text-white outline-none focus:border-emerald-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-slate-900 border border-white/5 rounded-[2.2rem] shadow-inner text-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Excel Footer Preview</p>
                    <div className="border-t border-dashed border-slate-700 pt-4 space-y-1">
                       <p className="text-[10px] font-bold text-slate-300 uppercase">Prepared By: <span className="text-emerald-400">{userName || "___"}</span></p>
                       <p className="text-[9px] font-bold text-slate-500 uppercase">{userDesignation}</p>
                       <p className="text-[8px] italic text-blue-400 mt-2">[Digitally Signed via RoadWise App]</p>
                    </div>
                  </div>
                </div>
              )}

              {settingsCategory === 'Sync' && isAuthenticated && (
                <div className="space-y-5 animate-in slide-in-from-bottom-2">
                  <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/10 flex gap-3">
                    <Info size={18} className="text-blue-400 shrink-0"/>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest">Cloud Configuration</p>
                      <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase">Enter deployment and report details.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">Google Script URL</label>
                      <input type="url" value={syncUrl} onChange={e => { setSyncUrl(e.target.value); localStorage.setItem('roadwise_sync_url', e.target.value); }} placeholder="https://script.google.com/..." className="w-full bg-black/30 border-2 border-slate-700 p-4 rounded-2xl text-[10px] font-bold text-white outline-none focus:border-blue-500" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">Report Recipient Email</label>
                      <input type="email" value={reportEmail} onChange={e => { setReportEmail(e.target.value); localStorage.setItem('roadwise_report_email', e.target.value); }} placeholder="office@project.com" className="w-full bg-black/30 border-2 border-slate-700 p-4 rounded-2xl text-[10px] font-bold text-white outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleTestSync} disabled={isTesting} className="flex flex-col items-center justify-center p-4 bg-slate-900 border border-slate-700 rounded-3xl gap-2 hover:bg-slate-800 transition-all">
                      <Zap size={20} className="text-amber-400"/>
                      <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Test Sync</span>
                    </button>
                    <button onClick={handleTestEmailSync} disabled={isTesting} className="flex flex-col items-center justify-center p-4 bg-slate-900 border border-slate-700 rounded-3xl gap-2 hover:bg-slate-800 transition-all">
                      <Mail size={20} className="text-emerald-400"/>
                      <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Test E-mail</span>
                    </button>
                  </div>
                  
                  <button onClick={() => setShowSetupGuide(true)} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                     <HelpCircle size={14}/> View Authorization Guide
                  </button>
                </div>
              )}

              {['Activities', 'Machinery', 'Materials', 'Manpower'].includes(settingsCategory) && isAuthenticated && (
                <div className="space-y-4 animate-in slide-in-from-bottom-2">
                  <div className={`p-5 bg-slate-900/50 border ${themeBorder}/20 rounded-3xl shadow-xl transition-colors`}>
                    <p className={`text-[9px] font-black ${themeText} uppercase tracking-widest mb-2`}>Add New Item</p>
                    {settingsCategory === 'Activities' ? (
                      <div className="space-y-2">
                         <input type="text" placeholder="BOQ Item (e.g. 3.2)" value={newActivity.boq} onChange={e => setNewActivity({...newActivity, boq: e.target.value})} className="w-full bg-black/40 p-3 rounded-xl text-xs font-bold text-white outline-none" />
                         <input type="text" placeholder="Activity Code" value={newActivity.code} onChange={e => setNewActivity({...newActivity, code: e.target.value})} className="w-full bg-black/40 p-3 rounded-xl text-xs font-bold text-white outline-none" />
                         <input type="text" placeholder="Description" value={newActivity.desc} onChange={e => setNewActivity({...newActivity, desc: e.target.value})} className="w-full bg-black/40 p-3 rounded-xl text-xs font-bold text-white outline-none" />
                      </div>
                    ) : (
                      <input type="text" placeholder={`Enter ${settingsCategory} Name`} value={newSettingVal} onChange={e => setNewSettingVal(e.target.value)} className="w-full bg-black/40 p-3 rounded-xl text-xs font-bold text-white outline-none" />
                    )}
                    <button onClick={addNewItemFromInputs} className={`w-full ${themeBg} text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors`}>
                      <PlusIcon size={14}/> Add to List
                    </button>
                  </div>

                  <div className="space-y-2 mt-6">
                    {(settingsCategory === 'Activities' ? dropdowns.activities : (dropdowns as any)[settingsCategory === 'Machinery' ? 'machineryTypes' : (settingsCategory === 'Materials' ? 'materials' : 'manpowerRoles')]).map((item: any, idx: number) => (
                      <div key={idx} className="p-4 bg-black/20 border border-white/5 rounded-[1.5rem] flex items-center justify-between">
                        <div className="pr-4">
                           {typeof item === 'string' ? (
                             <p className="text-[11px] font-bold text-slate-300">{item}</p>
                           ) : (
                             <>
                               <p className={`text-[8px] font-black ${themeText} uppercase`}>{item.boqItem}</p>
                               <p className="text-[11px] font-bold text-slate-300 leading-tight">{item.description}</p>
                             </>
                           )}
                        </div>
                        <button onClick={() => {
                          const key = settingsCategory === 'Activities' ? 'activities' : (settingsCategory === 'Machinery' ? 'machineryTypes' : (settingsCategory === 'Materials' ? 'materials' : 'manpowerRoles'));
                          updateDropdowns({...dropdowns, [key]: (dropdowns as any)[key].filter((_: any, i: number) => i !== idx)});
                        }} className="p-2 text-red-500 bg-white/5 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setIsSettingsOpen(false)} className="mt-8 w-full bg-slate-100 text-slate-900 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl">Close Settings</button>
          </div>
        ) : isAdding ? (
          <div className="fixed inset-0 z-[150] bg-slate-900 p-3 flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
            <div className="max-w-xl w-full h-[95vh] flex flex-col bg-slate-800 border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden relative">
              <div className