import React, { useState, useMemo, useEffect } from 'react';
import * as Lucide from 'lucide-react';

const DashboardVulcain = () => {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Gestion du scroll pour la barre de progression
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour l'affichage dynamique des icônes
  const Icon = ({ name, ...props }) => {
    const LucideIcon = Lucide[name] || Lucide.HelpCircle;
    return <LucideIcon {...props} />;
  };

  // Logique du "Contexte Opérationnel"
  const getOperationalContext = (client) => {
    const contexts = {
      "PETROBRAS": "Optimisation d'infrastructures critiques et raffinage.",
      "VALE": "Sécurité opérationnelle et logistique minière.",
      "CSN": "Expansion des capacités sidérurgiques.",
      "default": "Support technique et excellence opérationnelle."
    };
    return contexts[client] || contexts.default;
  };

  const chemtechProjects = [
    { id: "PBR-09410", client: "PETROBRAS", title: "Centrale Thermique UTE SEPE TIARAJU", period: "2012 - 2014", role: "Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Modélisation complète multidisciplinaire (Civil, Équipements, Tuyauterie). Extraction et révision d'isométriques.", skills: ["Modélisation 3D", "Piping"] },
    { id: "FWR-10397", client: "FEED PREMIUM ONSITE", title: "Support Technique Ingénierie", period: "2012", role: "Support", tools: "PDMS, Isométriques", details: "Adéquation, extraction, révision et exécution d'isométriques.", skills: ["Piping"] },
    { id: "PBR-10330", client: "PETROBRAS", title: "Logistique EBDMOTOB", period: "2012 - 2013", role: "Support d'Ingénierie", tools: "AutoCAD, PDMS", details: "Adéquation technique et révision d'isométriques pour les flux logistiques.", skills: ["Logistique", "Isométriques"] },
    { id: "VAL-11622", client: "VALE", title: "ABASLOCO", period: "2013", role: "Stagiaire Support", tools: "AutoCAD (DWG)", details: "Exécution et correction de plans techniques et de fichiers DWG.", skills: ["AutoCAD"] },
    { id: "PBR-10056", client: "PETROBRAS", title: "Revamp U-280 PD", period: "2012", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Support à la modélisation pour le projet de Revamping.", skills: ["Revamping"] },
    { id: "PTC-12001", client: "PTC", title: "EBD Coger", period: "2012", role: "Stagiaire Support", tools: "PDMS, Isométriques", details: "Travaux d'adéquation et exécution de documents de flexibilité.", skills: ["Piping"] },
    { id: "UNE-11651", client: "UNE", title: "UTCS UTGC", period: "2012 - 2013", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Tuyauterie"] },
    { id: "PBR-11693", client: "PETROBRAS", title: "PDMS COMOS", period: "2013", role: "Stagiaire Support", tools: "PDMS, COMOS", details: "Levé de terrain virtuel et intégration de données techniques.", skills: ["Data Integration"] },
    { id: "VAL-11601", client: "VALE", title: "Analyse Santé & Sécurité (HSE) São Luis", period: "2012 - 2014", role: "Support d'Ingénierie", tools: "Normes NR", details: "Élaboration de formulaires d'évaluation des risques et analyse de conformité selon les normes NR.", skills: ["HSE", "Audit"] },
    { id: "VAL-12549", client: "VALE", title: "Nouveau Poste de Maintenance", period: "2013", role: "Stagiaire Support", tools: "AutoCAD, Excel", details: "Recherche et remplissage de listes de matériels (BOM).", skills: ["BOM"] },
    { id: "CON-12584", client: "CON", title: "ADEXERNS - Modélisation Supports", period: "2013", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Modélisation de supports pour lignes fines et équipements.", skills: ["Supports"] },
    { id: "BSK-09274", client: "VAL-UO1-PD", title: "Fontes GM - Support Tuyauterie", period: "2013", role: "Stagiaire Support", tools: "PDMS, Isométriques", details: "Traitement et adéquation d'isométriques.", skills: ["Tuyauterie"] },
    { id: "BSF-13157", client: "BSF", title: "F265 J200 - Locação Equipamentos", period: "2014", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Modélisation et positionnement d'équipements industriels.", skills: ["3D Modeling"] },
    { id: "CSN-13139", client: "CSN", title: "Expansion Phase 2 - Sidérurgie", period: "2014", role: "Support d'Ingénierie", tools: "AutoCAD, BOM", details: "Arrangements mécaniques et repositionnement d'équipements lourds.", skills: ["Mécanique", "BOM"] },
    { id: "VAL-13546", client: "VALE", title: "Système de Pompage Booster CMC", period: "2014", role: "Support d'Ingénierie", tools: "PDMS, Procurement", details: "Adéquation de routes de tuyauterie et supports spéciaux.", skills: ["Piping", "Supports"] },
    { id: "VAL-13490", client: "VALE", title: "Dépoussiérage MAPU 230", period: "2014", role: "Stagiaire Support", tools: "AutoCAD (DWG)", details: "Mise en œuvre de dessins DWG et arrangements mécaniques.", skills: ["Mécanique"] },
    { id: "LXS-11424", client: "LXS", title: "Dessins Mécaniques & Isométriques", period: "2014", role: "Support d'Ingénierie", tools: "AutoCAD", details: "Conception conceptuelle et de base pour dessins mécaniques complexes.", skills: ["Mécanique"] },
    { id: "MJR-13169", client: "MJR", title: "MTOURE COMPERJ", period: "2013", role: "Stagiaire Support", tools: "Excel, PDMS", details: "Gestion des listes de matériels et extraction de données 3D.", skills: ["MTO"] },
    { id: "PBR-12045", client: "PETROBRAS", title: "Unité de Traitement Gaz Naturel", period: "2014", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Support à l'ingénierie de détail pour tuyauterie auxiliaire.", skills: ["Gaz Naturel"] },
    { id: "VAL-14002", client: "VALE", title: "Audit Infrastructures São Luis", period: "2014", role: "Stagiaire Support", tools: "Normes NR", details: "Vérification sur site de la conformité maquette vs réel.", skills: ["Audit Site"] }
  ];

  const filteredProjects = useMemo(() => {
    return chemtechProjects.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // STATISTIQUES (Correction : Déclaration unique)
  const stats = [
    { label: "Missions Petrobras", value: "8", icon: "Activity", color: "bg-blue-50", text: "text-blue-600" },
    { label: "Projets Vale/Mining", value: "6", icon: "Database", color: "bg-green-50", text: "text-green-600" },
    { label: "Modélisation 3D", value: "100%", icon: "Zap", color: "bg-yellow-50", text: "text-yellow-600" },
    { label: "Non-conformités HSE", value: "0", icon: "ShieldCheck", color: "bg-emerald-50", text: "text-emerald-600" }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 pb-12">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-50">
        <div className="h-full bg-gradient-to-r from-[#003366] to-[#10B981] transition-all" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <nav className="bg-[#003366] text-white p-4 md:p-8 shadow-2xl sticky top-0 z-40 border-b-4 border-[#10B981]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter">Eliandro Teles</h1>
            <p className="text-blue-200 font-bold text-[10px] md:text-sm uppercase tracking-widest">Support Ingénierie • Chemtech / Siemens</p>
          </div>
          <div className="flex items-center gap-3">
             <a href="https://site-eliandro.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-[#10B981] transition-all">
               <Icon name="Globe" size={18} />
             </a>
             <a href="https://www.linkedin.com/in/eliandro-teles" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-blue-600 transition-all">
               <Icon name="LinkedIn" size={18} />
             </a>
             <a href="https://github.com/teles-eliandro/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-slate-800 transition-all">
               <Icon name="GitHub" size={18} />
             </a>
             <div className="bg-[#10B981] text-white px-4 py-2 rounded-full font-black italic text-xs flex items-center gap-2">
                <Icon name="Zap" size={14} /> DISPONIBLE
             </div>
          </div>
        </div>
      </nav>


      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all">
              <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                <Icon name={stat.icon} className={stat.text} size={20} />
              </div>
              <div className="text-2xl md:text-4xl font-black text-[#003366] tracking-tighter">{stat.value}</div>
              <div className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-6 md:p-10 bg-slate-50 border-r border-slate-100">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-[#003366] rounded-full text-[10px] font-black uppercase mb-4">
                <Icon name="Star" size={12} className="fill-[#003366]"/> Expérience Pilier
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#003366] leading-none mb-4 italic uppercase">Chemtech <span className="text-[#10B981]">Siemens</span></h2>
              <p className="text-slate-600 text-sm md:text-base font-medium italic leading-relaxed mb-6">
                "Deux ans d'immersion au sein d'une filiale Siemens, assurant le support technique sur des projets Oil & Gas complexes."
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                  <span className="font-bold text-xs uppercase">Projets délivrés</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black text-xs">20</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                  <span className="font-bold text-xs uppercase">Conformité HSE</span>
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-black text-xs">100%</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project Console</h3>
                <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2">
                   {isSearchOpen && (
                     <input 
                       className="bg-transparent border-none outline-none text-xs font-bold w-24 md:w-40"
                       placeholder="Filtrer..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       autoFocus
                     />
                   )}
                   <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                     <Icon name="Search" size={16} className={isSearchOpen ? "text-[#10B981]" : "text-slate-400"}/>
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredProjects.map((project) => (
                  <div key={project.id} onClick={() => setSelectedProjectIdx(chemtechProjects.findIndex(p => p.id === project.id))} className="group bg-slate-50 hover:bg-[#003366] p-4 rounded-2xl border border-slate-200 transition-all cursor-pointer relative">
                    <div className="relative z-10">
                      <div className="flex justify-between mb-2">
                        <span className="text-[8px] font-black px-2 py-1 bg-white group-hover:bg-[#10B981] rounded text-[#003366] uppercase">{project.client}</span>
                        <span className="text-[8px] font-bold text-slate-400 group-hover:text-blue-200">{project.period}</span>
                      </div>
                      <h4 className="font-black text-[#003366] group-hover:text-white text-[11px] uppercase italic mb-2 leading-tight">{project.title}</h4>
                      <div className="mt-2 pt-2 border-t border-slate-200 group-hover:border-white/10">
                         <p className="text-[9px] font-bold text-slate-400 group-hover:text-[#10B981] uppercase mb-1">Contexte :</p>
                         <p className="text-[9px] text-slate-500 group-hover:text-white/70 italic line-clamp-1">{getOperationalContext(project.client)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#003366] p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 p-12 opacity-5">
            <Icon name="Database" size={200} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Technical Stack</h3>
              <p className="text-blue-200 font-medium italic">
                L'ensemble des outils maîtrisés et déployés sur les infrastructures critiques Petrobras et Vale.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {["PDMS", "AutoCAD", "COMOS", "Naviswork", "Excel", "MS Project"].map(tool => (
                <div key={tool} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-white/20 transition-all group">
                  <Icon name="PenTool" size={20} className="mb-2 text-[#10B981] group-hover:scale-110 transition-transform"/>
                  <span className="font-black text-xs uppercase tracking-widest">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="fixed bottom-6 right-6 z-40">
           <a href="/Dossier Technique - Eliandro Teles.pdf" download className="block">
            <button className="bg-gradient-to-r from-[#10B981] to-blue-600 text-white px-6 py-4 rounded-full font-black text-sm md:text-base shadow-2xl flex items-center gap-3 hover:scale-105 transition-all animate-bounce">
              <Icon name="Zap" size={20}/> 📄 DOSSIER TECHNIQUE
            </button>
          </a>
        </div>
      </main>

      {selectedProjectIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001529]/95 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-[#003366] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">PROJET {selectedProjectIdx + 1} / 20</span>
                  <h2 className="text-2xl font-black text-[#003366] uppercase italic mt-3">{chemtechProjects[selectedProjectIdx].title}</h2>
                </div>
                <button onClick={() => setSelectedProjectIdx(null)} className="text-slate-300 hover:text-red-500"><Icon name="X" size={28} /></button>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-[#10B981]">
                  <p className="text-sm font-black text-blue-600 uppercase mb-2">Description</p>
                  <p className="text-sm font-medium italic text-slate-700 leading-relaxed">"{chemtechProjects[selectedProjectIdx].details}"</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50/50 p-4 rounded-xl">
                    <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Stack Technique</p>
                    <p className="font-bold text-[#003366] text-xs uppercase">{chemtechProjects[selectedProjectIdx].tools}</p>
                  </div>
                  <div className="bg-green-50/50 p-4 rounded-xl">
                    <p className="text-[9px] font-black text-green-600 uppercase mb-1">Secteur</p>
                    <p className="font-bold text-[#003366] text-xs uppercase">{chemtechProjects[selectedProjectIdx].client}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setSelectedProjectIdx(prev => (prev - 1 + 20) % 20)} className="flex-1 bg-slate-100 py-3 rounded-xl font-black text-[#003366] text-[10px] hover:bg-[#10B981] hover:text-white transition-all uppercase flex items-center justify-center gap-2"><Icon name="ChevronLeft" size={14}/> Précédent</button>
                <button onClick={() => setSelectedProjectIdx(prev => (prev + 1) % 20)} className="flex-1 bg-slate-100 py-3 rounded-xl font-black text-[#003366] text-[10px] hover:bg-[#10B981] hover:text-white transition-all uppercase flex items-center justify-center gap-2">Suivant <Icon name="ChevronRight" size={14}/></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardVulcain;
