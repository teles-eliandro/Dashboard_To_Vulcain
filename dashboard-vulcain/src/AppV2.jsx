import React, { useState, useEffect } from 'react';
import { 
  Settings, ShieldCheck, PenTool, Globe, ChevronRight, ChevronLeft, 
  Briefcase, X, Calendar, MapPin, CheckCircle, TrendingUp, Target, Database, MousePointer2,
  Search, Filter, Star, Clock, Award, Zap, Maximize2
} from 'lucide-react';

const generateProjectSummary = (project) => {
  const summaries = {
    "PETROBRAS": "Optimisation d'infrastructures critiques pour la production d'énergie et le raffinage, nécessitant une précision absolue en modélisation 3D et une gestion rigoureuse des flux de tuyauterie.",
    "VALE": "Amélioration de la sécurité opérationnelle et de l'efficacité logistique sur des sites miniers et industriels de grande envergure, avec un focus majeur sur la conformité HSE.",
    "CSN": "Accompagnement de l'expansion de capacités sidérurgiques via la réorganisation mécanique et l'intégration de nouveaux équipements lourds en environnement contraint.",
    "default": "Support technique multidisciplinaire visant à garantir la conformité réglementaire et l'excellence opérationnelle sur des projets d'ingénierie complexes."
  };
  
  const text = summaries[project.client] || summaries.default;
  return text.split('[cite')[0].trim();
};

const DashboardVulcain = () => {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
  const [filterSkill, setFilterSkill] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Barre de progression au scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const kpis = [
    { label: "Projets Pétrole & Gaz", value: "15+", sub: "Expertise Chemtech/Siemens", icon: <Settings className="text-blue-600" />, filter: "Pétrole & Gaz", color: "blue" },
    { label: "Conformité HSE", value: "100%", sub: "Normes NR & Rigueur", icon: <ShieldCheck className="text-green-600" />, filter: "HSE", color: "green" },
    { label: "Logiciels CAO/Tech", value: "12+", sub: "PDMS, Vesta, HighScore...", icon: <PenTool className="text-blue-600" />, filter: "Logiciels", color: "purple" },
    { label: "Langues", value: "3", sub: "PT (Nat), FR (Cour), EN (Tech)", icon: <Globe className="text-blue-600" />, filter: "Langues", color: "orange" }
  ];

  const chemtechProjects = [
    { id: "PBR-09410", client: "PETROBRAS", title: "Centrale Thermique UTE SEPE TIARAJU", period: "2012 - 2015", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD, MS Office", details: "Modélisation complète (Civil, Équipements, Tuyauterie, Métallique, Électrique). Extraction, révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Modélisation 3D", "Piping", "Isométriques"], year: 2012, category: "Pétrole & Gaz" },
    { id: "FWR-10397", client: "FEED PREMIUM ONSITE", title: "Support Technique Ingénierie", period: "2012", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, Isométriques", details: "Adéquation, extraction, révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Piping", "Flexibilité"], year: 2012, category: "Ingénierie" },
    { id: "PBR-10330", client: "PETROBRAS", title: "EBDMOTOB & EDAdeqLogist", period: "2012 - 2013", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD, PDMS", details: "Adéquation technique, révision d'isométriques et support aux documents de flexibilité pour la logistique.", skills: ["Logistique technique", "Isométriques"], year: 2012, category: "Pétrole & Gaz" },
    { id: "VAL-11622", client: "VALE", title: "ABASLOCO", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD (DWG)", details: "Exécution et correction de plans techniques et de fichiers DWG pour le projet.", skills: ["Dessin Technique", "AutoCAD"], year: 2013, category: "Minier" },
    { id: "VAL-11601", client: "VALE", title: "Analyse Santé & Sécurité (HSE) São Luis", period: "2012 - 2015", role: "Stagiaire Support d'Ingénierie", tools: "Normes NR, MS Office", details: "Élaboration de formulaires d'évaluation des risques. Analyse de conformité selon les normes NR et marquage de copies physiques.", skills: ["HSE", "Audit", "Normes NR"], year: 2012, category: "HSE" },
    { id: "CSN-13139", client: "CSN", title: "Expansion Phase 2 - Sidérurgie", period: "2014 - 2015", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD (DWG), MS Office", details: "Arrangements mécaniques, moyens de passage et repositionnement d'équipements lourds. Élaboration de listes de matériels (BOM). Projets de base et détaillé.", skills: ["Mécanique", "BOM", "Layout Design"], year: 2014, category: "Sidérurgie" }
  ];

  const filteredProjects = filterSkill 
    ? chemtechProjects.filter(p => p.category === filterSkill || p.skills.includes(filterSkill))
    : chemtechProjects;

  const nextProject = () => setSelectedProjectIdx((prev) => (prev + 1) % filteredProjects.length);
  const prevProject = () => setSelectedProjectIdx((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-12 md:pb-20">
      
      {/* Barre de progression sticky */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* HEADER RESPONSIVE */}
      <nav className="bg-[#003366] text-white p-4 md:p-8 shadow-xl sticky top-0 z-40 border-b-4 border-blue-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">Eliandro Pereira Teles</h1>
            <p className="text-blue-200 font-bold text-sm md:text-lg italic">Ingénieur Support Technique | Candidature Vulcain</p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 px-4 md:px-6 py-1 md:py-2 rounded-full font-black italic text-sm md:text-base flex items-center gap-2 animate-pulse">
            <Zap size={16}/> DISPONIBLE
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-10 mt-6 md:mt-8">

        {/* ROW DES 4 CARTES KPI INTERACTIVES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {kpis.map((kpi, i) => (
            <button 
              key={i} 
              onClick={() => setFilterSkill(kpi.filter === filterSkill ? null : kpi.filter)}
              className={`bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-md border-b-4 transition-all text-left w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 ${
                filterSkill === kpi.filter ? 'border-green-500 bg-green-50' : 'border-blue-600'
              }`}
            >
              <div className="bg-blue-50 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-3 md:mb-4">{kpi.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-[#003366]">{kpi.value}</div>
              <div className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">{kpi.label}</div>
              <div className="text-xs text-blue-600 font-bold mt-1">{kpi.sub}</div>
              <div className="text-[8px] text-gray-400 mt-2 flex items-center gap-1">
                <Filter size={8}/> Cliquez pour filtrer
              </div>
            </button>
          ))}
        </div>

        {/* SECTION MD CONCEPT AVEC GRAPHIQUE ANIMÉ */}
        <section className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 text-green-600 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={100} className="md:w-[150px] md:h-[150px] animate-bounce" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl md:rounded-2xl text-white shadow-lg">
                <Briefcase size={20} className="md:w-6 md:h-6"/>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase italic">MD Concept | Chargé d'affaires (2022-2024)</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center">
              <div className="lg:col-span-2 space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <Star size={16} className="fill-green-600"/>
                  <span className="text-xs uppercase tracking-wider">Résultat clé</span>
                </div>
                <p className="text-base md:text-lg text-slate-600 font-medium italic leading-relaxed">
                  "À mon arrivée, j'ai pris en charge la prospection active et la gestion client. Grâce à la standardisation des documents et à la qualité des propositions commerciales (modélisations 2D/3D), j'ai atteint un taux de signature de <span className="text-green-600 font-black text-xl md:text-2xl">1 devis sur 3</span>, augmentant significativement le chiffre d'affaires de la boîte."
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-green-200 text-center transform hover:scale-105 transition-all">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                    <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray="351.85" strokeDashoffset="235.74" className="transition-all duration-1000"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl md:text-5xl font-black text-green-700 italic">33%</p>
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] font-black uppercase text-green-600 tracking-widest mt-2">Taux de Conversion</p>
                <p className="text-xs font-bold text-slate-500 mt-1">Signature sur rendez-vous</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION SIEMENS EN TIMELINE INTERACTIVE */}
        <section className="bg-gradient-to-br from-[#EFFFF6] to-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-gradient-to-r from-[#10B981] to-emerald-600 rounded-xl md:rounded-2xl text-white shadow-lg">
                <Settings size={20} className="md:w-7 md:h-7" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase italic">Chemtech (Siemens Group)</h3>
                <p className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-gray-400 flex flex-wrap gap-2 mt-1">
                  <span className="text-[#10B981] italic">Engineering Support / Piping</span>
                  <span>• 2012 — 2015 • Brésil</span>
                </p>
              </div>
            </div>
            
            {filterSkill && (
              <button 
                onClick={() => setFilterSkill(null)}
                className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition-colors"
              >
                ✕ Filtre actif : {filterSkill}
              </button>
            )}
          </div>

          {/* Timeline interactive */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#10B981] mb-4">
              <Clock size={16}/>
              <span className="text-xs font-black uppercase tracking-wider">Parcours 2012 → 2015</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
              {filteredProjects.slice(0, 8).map((project, idx) => (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProjectIdx(chemtechProjects.findIndex(p => p.id === project.id))}
                  className="bg-white p-4 rounded-xl border-l-4 border-[#10B981] hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-[#10B981] uppercase">{project.client}</span>
                    <span className="text-[9px] text-gray-400">{project.period}</span>
                  </div>
                  <h4 className="font-bold text-[#003366] text-sm mb-2 group-hover:text-[#10B981] transition-colors">{project.title}</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.skills.slice(0, 2).map(skill => (
                      <span key={skill} className="text-[8px] bg-gray-100 px-2 py-0.5 rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProjects.length > 8 && (
              <p className="text-center text-xs text-gray-400 mt-2">+{filteredProjects.length - 8} autres projets</p>
            )}
          </div>
        </section>

        {/* LOGICIELS & IA EN NUAGE DE MOTS */}
        <section className="bg-gradient-to-r from-[#003366] to-blue-900 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] text-white">
          <h3 className="text-lg md:text-xl font-black mb-6 md:mb-8 uppercase italic flex items-center gap-3">
            <Database size={20} className="md:w-6 md:h-6"/> Stack Technique & Outils
          </h3>
          
          <div className="space-y-6 md:space-y-8">
            <div>
              <p className="text-blue-300 font-black text-[9px] md:text-[10px] uppercase mb-3 md:mb-4 tracking-widest">CAO & Modélisation</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["PDMS", "AutoCAD", "SolidWorks", "FluidSim", "NX"].map((s, i) => (
                  <span key={s} className={`bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold transition-all hover:scale-110 cursor-pointer ${
                    i === 0 ? 'text-base md:text-lg' : i === 1 ? 'text-sm md:text-base' : 'text-xs md:text-sm'
                  }`}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-300 font-black text-[9px] md:text-[10px] uppercase mb-3 md:mb-4 tracking-widest">Analyse & Recherche</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["X'Pert HighScore Plus", "VESTA", "SigmaPlot", "Statistica"].map(s => (
                  <span key={s} className="bg-white/10 px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold hover:scale-105 transition-all cursor-pointer">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-300 font-black text-[9px] md:text-[10px] uppercase mb-3 md:mb-4 tracking-widest">Gestion & Innovation</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["MS Project", "ClickUp", "n8n (Automation)", "LLM/RAG"].map(s => (
                  <span key={s} className="bg-blue-500/30 px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold border border-blue-400/30 hover:scale-105 transition-all cursor-pointer">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sticky CTA flottant */}
        <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-40">
          <button className="bg-gradient-to-r from-[#002B49] to-blue-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-black text-sm md:text-base shadow-2xl flex items-center gap-2 hover:scale-105 transition-all animate-pulse">
            📄 Dossier Complet <ChevronRight size={16} />
          </button>
        </div>

        <footer className="bg-gradient-to-r from-[#002B49] to-blue-800 p-6 md:p-8 rounded-2xl md:rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h4 className="text-xl md:text-2xl font-bold">Prêt à relever les défis de Vulcain</h4>
            <p className="text-blue-200 opacity-80 mt-1 uppercase tracking-tighter font-medium text-sm md:text-base">Ingénierie • Support • Excellence</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-[#002B49] hover:bg-blue-50 px-4 md:px-6 py-2 md:py-3 rounded-full font-black text-sm md:text-base shadow-lg flex items-center gap-2 transition-all">
              CV Complet <ChevronRight size={16} />
            </button>
            <button className="border-2 border-white px-4 md:px-6 py-2 md:py-3 rounded-full font-black text-sm md:text-base hover:bg-white/10 transition-all">
              LinkedIn
            </button>
          </div>
        </footer>

      </main>

      {/* MODAL CARROUSEL RESPONSIVE (identique à la version 1) */}
      {selectedProjectIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-slate-900/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-[95%] md:max-w-2xl rounded-2xl md:rounded-[2.5rem] shadow-2xl relative">
            <div className="absolute inset-y-0 -left-2 md:-left-6 -right-2 md:-right-6 flex items-center justify-between pointer-events-none">
              <button onClick={prevProject} className="p-2 md:p-4 bg-white hover:bg-[#10B981] text-[#003366] rounded-full shadow-xl pointer-events-auto">
                <ChevronLeft size={20} className="md:w-7 md:h-7"/>
              </button>
              <button onClick={nextProject} className="p-2 md:p-4 bg-white hover:bg-[#10B981] text-[#003366] rounded-full shadow-xl pointer-events-auto">
                <ChevronRight size={20} className="md:w-7 md:h-7"/>
              </button>
            </div>
            <div className="p-4 md:p-10">
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between w-full pr-6 md:pr-8">
                    <span className="bg-[#003366] text-white px-2 md:px-4 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase">
                      Projet {selectedProjectIdx + 1} / {filteredProjects.length}
                    </span>
                    <span className="text-slate-400 font-bold text-[8px] md:text-[10px] uppercase">
                      ID: {filteredProjects[selectedProjectIdx].id}
                    </span>
                  </div>
                  <h3 className="text-[#10B981] font-black text-[10px] md:text-sm uppercase pt-3 md:pt-4">
                    CLIENT : {filteredProjects[selectedProjectIdx].client}
                  </h3>
                  <h2 className="text-2xl md:text-4xl font-black text-[#003366] uppercase italic leading-tight">
                    {filteredProjects[selectedProjectIdx].title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] md:text-xs uppercase pt-1">
                    <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                    <span>{filteredProjects[selectedProjectIdx].period}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedProjectIdx(null)} className="absolute top-4 right-4 md:top-8 md:right-8 p-1 text-slate-300 hover:text-red-500">
                  <X size={24} className="md:w-9 md:h-9"/>
                </button>
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="bg-emerald-50/50 p-3 md:p-5 rounded-xl border border-emerald-100">
                  <p className="text-[8px] md:text-[10px] font-black text-[#10B981] uppercase mb-1 flex items-center gap-2">
                    <Target size={10}/> Contexte Opérationnel
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium italic">
                    {generateProjectSummary(filteredProjects[selectedProjectIdx])}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 md:p-8 rounded-xl border-l-4 border-[#10B981]">
                  <p className="text-base md:text-xl font-medium italic text-slate-700">
                    "{filteredProjects[selectedProjectIdx].details.split('[cite')[0].trim()}"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-[8px] md:text-[10px] font-black text-[#10B981] uppercase mb-1">Poste</p>
                    <p className="font-bold text-[#003366] text-sm md:text-lg italic">{filteredProjects[selectedProjectIdx].role}</p>
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] font-black text-[#10B981] uppercase mb-1">Stack</p>
                    <p className="font-bold text-[#003366] text-sm md:text-lg italic">{filteredProjects[selectedProjectIdx].tools}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardVulcain;