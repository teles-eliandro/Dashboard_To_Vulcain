import React, { useState, useMemo } from 'react';
import { 
  Settings, ShieldCheck, PenTool, Globe, ChevronRight, ChevronLeft, 
  Briefcase, X, Calendar, CheckCircle, TrendingUp, Target, Database,
  Search, Clock, Award, Zap, Star, BarChart3, Activity, 
  Github as GithubIcon, Linkedin as LinkedinIcon, ExternalLink 
} from 'lucide-react';

const generateProjectSummary = (project) => {
  const summaries = {
    "PETROBRAS": "Optimisation d'infrastructures critiques pour la production d'énergie et le raffinage, nécessitant une précision absolue en modélisation 3D et une gestion rigoureuse des flux de tuyauterie.",
    "VALE": "Amélioration de la sécurité opérationnelle et de l'efficacité logistique sur des sites miniers et industriels de grande envergure, avec un focus majeur sur la conformité HSE.",
    "CSN": "Accompagnement de l'expansion de capacités sidérurgiques via la réorganisation mécanique et l'intégration de nouveaux équipements lourds en environnement contraint.",
    "default": "Support technique multidisciplinaire visant à garantir la conformité réglementaire et l'excellence opérationnelle sur des projets d'ingénierie complexes."
  };
  return summaries[project.client] || summaries.default;
};

const DashboardVulcain = () => {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const chemtechProjects = [
    { id: "PBR-09410", client: "PETROBRAS", title: "Centrale Thermique UTE SEPE TIARAJU", period: "2012 - 2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD, MS Office", details: "Modélisation complète (Civil, Équipements, Tuyauterie, Métallique, Électrique). Extraction, révision et exécution d'isométriques.", skills: ["Modélisation 3D", "Piping", "Isométriques"] },
    { id: "FWR-10397", client: "FEED PREMIUM ONSITE", title: "Support Technique Ingénierie", period: "2012", role: "Stagiaire Support", tools: "PDMS, Isométriques", details: "Adéquation, extraction, révision et exécution d'isométriques.", skills: ["Piping", "Flexibilité"] },
    { id: "PBR-10330", client: "PETROBRAS", title: "EBDMOTOB & EDAdeqLogist", period: "2012 - 2013", role: "Stagiaire Support", tools: "AutoCAD, PDMS", details: "Adéquation technique, révision d'isométriques pour la logistique.", skills: ["Logistique", "Isométriques"] },
    { id: "VAL-11622", client: "VALE", title: "ABASLOCO", period: "2013", role: "Stagiaire Support", tools: "AutoCAD (DWG)", details: "Exécution et correction de plans techniques et de fichiers DWG.", skills: ["Dessin Technique", "AutoCAD"] },
    { id: "PBR-10056", client: "PETROBRAS", title: "Revamp U-280 PD", period: "2012", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Support à la modélisation pour le projet de Revamping.", skills: ["Revamping", "Piping"] },
    { id: "PTC-12001", client: "PTC", title: "EBD Coger", period: "2012", role: "Stagiaire Support", tools: "PDMS, Isométriques", details: "Travaux d'adéquation et exécution de documents de flexibilité.", skills: ["Piping", "Support"] },
    { id: "UNE-11651", client: "UNE", title: "UTCS UTGC", period: "2012 - 2013", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Tuyauterie", "Flexibilité"] },
    { id: "PBR-11693", client: "PETROBRAS", title: "PDMS COMOS", period: "2013", role: "Stagiaire Support", tools: "PDMS, COMOS", details: "Levé de terrain virtuel et intégration de données techniques.", skills: ["Virtual Survey", "Data"] },
    { id: "VAL-11601", client: "VALE", title: "Analyse HSE São Luis", period: "2012 - 2014", role: "Stagiaire Support", tools: "Normes NR, MS Office", details: "Élaboration de formulaires d'évaluation des risques HSE.", skills: ["HSE", "Audit", "Normes NR"] },
    { id: "VAL-12549", client: "VALE", title: "Nouveau Poste de Maintenance", period: "2013", role: "Stagiaire Support", tools: "AutoCAD, Excel", details: "Recherche et remplissage de listes de matériels (BOM).", skills: ["BOM", "AutoCAD"] },
    { id: "CON-12584", client: "CON", title: "ADEXERNS - Modélisation Supports", period: "2013", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Modélisation de supports pour lignes fines et équipements.", skills: ["Supports", "Detailing"] },
    { id: "BSK-09274", client: "VAL-UO1-PD", title: "Fontes GM - Support Tuyauterie", period: "2013", role: "Stagiaire Support", tools: "PDMS, Isométriques", details: "Traitement et adéquation d'isométriques pour les lignes de production.", skills: ["Tuyauterie", "Isométriques"] },
    { id: "BSF-13157", client: "BSF", title: "F265 J200 - Locação Equipamentos", period: "2014", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Modélisation et positionnement d'équipements industriels.", skills: ["3D Modeling", "Plant Layout"] },
    { id: "CSN-13139", client: "CSN", title: "Expansion Phase 2 - Sidérurgie", period: "2014", role: "Stagiaire Support", tools: "AutoCAD (DWG)", details: "Arrangements mécaniques et repositionnement d'équipements lourds.", skills: ["Mécanique", "Layout Design"] },
    { id: "VAL-13546", client: "VALE", title: "Système de Pompage Booster CMC", period: "2014", role: "Stagiaire Support", tools: "PDMS, MS Office", details: "Adéquation de routes de tuyauterie et supports spéciaux.", skills: ["Piping", "Supports"] },
    { id: "VAL-13490", client: "VALE", title: "Dépoussiérage MAPU 230", period: "2014", role: "Stagiaire Support", tools: "AutoCAD (DWG)", details: "Mise en œuvre de dessins DWG et arrangements mécaniques.", skills: ["Mécanique", "Tuyauterie"] },
    { id: "LXS-11424", client: "LXS", title: "Dessins Mécaniques & Isométriques", period: "2014", role: "Stagiaire Support", tools: "AutoCAD, Isométriques", details: "Élaboration et adéquation de dessins mécaniques.", skills: ["Mécanique", "Isométriques"] },
    { id: "MJR-13169", client: "MJR", title: "MTOURE COMPERJ", period: "2013", role: "Stagiaire Support", tools: "Excel, PDMS", details: "Gestion des listes de matériels et extraction de données 3D.", skills: ["MTO", "Data"] },
    { id: "PBR-12045", client: "PETROBRAS", title: "Unité de Traitement Gaz Naturel", period: "2014", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Support à l'ingénierie de détail pour tuyauterie auxiliaire.", skills: ["Gaz Naturel", "Detailing"] },
    { id: "VAL-14002", client: "VALE", title: "Audit Infrastructures São Luis", period: "2014", role: "Stagiaire Support", tools: "Normes NR", details: "Vérification sur site de la conformité maquette vs réel.", skills: ["Audit Site", "As-Built"] }
  ];

  const filteredProjects = useMemo(() => {
    return chemtechProjects.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const stats = [
    { label: "Missions Petrobras", value: "9", icon: <Activity className="text-blue-600" /> },
    { label: "Projets Vale/Mining", value: "7", icon: <Database className="text-green-600" /> },
    { label: "Total Projets", value: "20", icon: <BarChart3 className="text-yellow-600" /> },
    { label: "HSE Conformité", value: "100%", icon: <ShieldCheck className="text-emerald-600" /> }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      <nav className="bg-[#003366] text-white p-6 shadow-xl sticky top-0 z-40 border-b-4 border-[#10B981]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">Eliandro Teles</h1>
            <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Support Ingénierie • Chemtech Siemens</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://votre-portfolio.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/10">
              <ExternalLink size={18} />
            </a>
            <a href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-blue-600 rounded-lg transition-all border border-white/10">
              <LinkedinIcon size={18} />
            </a>
            <a href="https://github.com/votre-github" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-slate-800 rounded-lg transition-all border border-white/10">
              <GithubIcon size={18} />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="mb-2 opacity-80">{stat.icon}</div>
              <div className="text-2xl font-black text-[#003366]">{stat.value}</div>
              <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Settings size={14} className="animate-spin-slow" /> Project Console
            </h3>
            <div className="flex items-center gap-2">
              {isSearchVisible && (
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="text-xs p-1.5 border-b border-blue-600 outline-none bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              )}
              <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                <Search size={18} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto">
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProjectIdx(chemtechProjects.findIndex(p => p.id === project.id))}
                className="group bg-white hover:bg-[#003366] p-4 rounded-2xl border border-slate-200 transition-all cursor-pointer hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-black px-2 py-0.5 bg-blue-50 group-hover:bg-[#10B981] text-[#003366] rounded uppercase">{project.client}</span>
                  <span className="text-[8px] font-bold text-slate-400 group-hover:text-white/50">{project.period}</span>
                </div>
                <h4 className="font-bold text-[#003366] group-hover:text-white text-xs uppercase line-clamp-1">{project.title}</h4>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedProjectIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative">
            <button onClick={() => setSelectedProjectIdx(null)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 z-10">
              <X size={24} />
            </button>
            
            <div className="p-8">
              <span className="text-[9px] font-black text-[#10B981] uppercase tracking-[0.2em]">Détails Mission</span>
              <h2 className="text-xl font-black text-[#003366] uppercase italic mt-2 leading-tight">
                {chemtechProjects[selectedProjectIdx].title}
              </h2>

              <div className="mt-6 space-y-4">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-1 flex items-center gap-1">
                    <Target size={12}/> Contexte Opérationnel
                  </p>
                  <p className="text-xs text-slate-600 italic font-medium leading-relaxed">
                    {generateProjectSummary(chemtechProjects[selectedProjectIdx])}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-[#10B981]">
                  <p className="text-sm font-medium text-slate-700 italic">
                    "{chemtechProjects[selectedProjectIdx].details}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Outils</p>
                    <p className="text-[10px] font-bold text-[#003366]">{chemtechProjects[selectedProjectIdx].tools}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[8px] font-black text-slate-400 uppercase">ID Projet</p>
                    <p className="text-[10px] font-bold text-[#003366]">{chemtechProjects[selectedProjectIdx].id}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-8">
                <button 
                  onClick={() => setSelectedProjectIdx(prev => (prev - 1 + 20) % 20)}
                  className="flex-1 bg-slate-100 py-3 rounded-xl text-[10px] font-black hover:bg-[#10B981] hover:text-white transition-all"
                >
                  PRÉCÉDENT
                </button>
                <button 
                  onClick={() => setSelectedProjectIdx(prev => (prev + 1) % 20)}
                  className="flex-1 bg-slate-100 py-3 rounded-xl text-[10px] font-black hover:bg-[#10B981] hover:text-white transition-all"
                >
                  SUIVANT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardVulcain;
