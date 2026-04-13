import React, { useState, useEffect } from 'react';
import { 
  Settings, ShieldCheck, PenTool, Globe, ChevronRight, ChevronLeft, 
  Briefcase, X, Calendar, CheckCircle, TrendingUp, Target, Database,
  Search, Clock, Award, Zap, Star
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
    { label: "Projets Pétrole & Gaz", value: "15+", sub: "Expertise Chemtech/Siemens", icon: <Settings className="text-blue-600" /> },
    { label: "Conformité HSE", value: "100%", sub: "Normes NR & Rigueur", icon: <ShieldCheck className="text-green-600" /> },
    { label: "Logiciels CAO/Tech", value: "12+", sub: "PDMS, Vesta, HighScore...", icon: <PenTool className="text-blue-600" /> },
    { label: "Langues", value: "3", sub: "PT (Nat), FR (Cour), EN (Tech)", icon: <Globe className="text-blue-600" /> }
  ];

  // --- TOUS LES 17 PROJETS (COMPLETS) ---
  const chemtechProjects = [
    { id: "PBR-09410", client: "PETROBRAS", title: "Centrale Thermique UTE SEPE TIARAJU", period: "2012 - 2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD, MS Office", details: "Modélisation complète (Civil, Équipements, Tuyauterie, Métallique, Électrique). Extraction, révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Modélisation 3D", "Piping", "Isométriques"] },
    { id: "FWR-10397", client: "FEED PREMIUM ONSITE", title: "Support Technique Ingénierie", period: "2012", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, Isométriques", details: "Adéquation, extraction, révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Piping", "Flexibilité"] },
    { id: "PBR-10330", client: "PETROBRAS", title: "EBDMOTOB & EDAdeqLogist", period: "2012 - 2013", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD, PDMS", details: "Adéquation technique, révision d'isométriques et support aux documents de flexibilité pour la logistique.", skills: ["Logistique technique", "Isométriques"] },
    { id: "VAL-11622", client: "VALE", title: "ABASLOCO", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD (DWG)", details: "Exécution et correction de plans techniques et de fichiers DWG pour le projet.", skills: ["Dessin Technique", "AutoCAD"] },
    { id: "PBR-10056", client: "PETROBRAS", title: "Revamp U-280 PD", period: "2012", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Support à la modélisation pour le projet de Revamping. Extraction et révision d'isométriques.", skills: ["Revamping", "Piping"] },
    { id: "PTC-12001", client: "PTC", title: "EBD Coger", period: "2012", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, Isométriques", details: "Travaux d'adéquation et exécution de documents de flexibilité et isométriques.", skills: ["Piping", "Support Technique"] },
    { id: "UNE-11651", client: "UNE", title: "UTCS UTGC", period: "2012 - 2013", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Tuyauterie", "Flexibilité"] },
    { id: "PBR-11693", client: "PETROBRAS", title: "PDMS COMOS", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, COMOS", details: "Levé de terrain virtuel et intégration de données techniques.", skills: ["Virtual Survey", "Data Integration"] },
    { id: "VAL-11601", client: "VALE", title: "Analyse Santé & Sécurité (HSE) São Luis", period: "2012 - 2014", role: "Stagiaire Support d'Ingénierie", tools: "Normes NR, MS Office", details: "Élaboration de formulaires d'évaluation des risques. Analyse de conformité selon les normes NR et marquage de copies physiques.", skills: ["HSE", "Audit", "Normes NR"] },
    { id: "VAL-12549", client: "VALE", title: "Nouveau Poste de Maintenance", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD, Excel", details: "Recherche et remplissage de listes de matériels (BOM). Élaboration et correction de fichiers DWG.", skills: ["BOM", "AutoCAD"] },
    { id: "CON-12584", client: "CON", title: "ADEXERNS - Modélisation Supports", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Modélisation de supports pour lignes fines et équipements. Maquettage d'isométriques et documentation générale.", skills: ["Supports", "Detailing"] },
    { id: "BSK-09274", client: "VAL-UO1-PD", title: "Fontes GM - Support Tuyauterie", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, Isométriques", details: "Traitement et adéquation d'isométriques pour les lignes de production.", skills: ["Tuyauterie", "Isométriques"] },
    { id: "BSF-13157", client: "BSF", title: "F265 J200 - Locação Equipamentos", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Modélisation et positionnement d'équipements industriels conformément aux plans d'implantation.", skills: ["3D Modeling", "Plant Layout"] },
    { id: "CSN-13139", client: "CSN", title: "Expansion Phase 2 - Sidérurgie", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD (DWG), MS Office", details: "Arrangements mécaniques, moyens de passage et repositionnement d'équipements lourds. Élaboration de listes de matériels (BOM). Projets de base et détaillé.", skills: ["Mécanique", "BOM", "Layout Design"] },
    { id: "VAL-13546", client: "VALE", title: "Système de Pompage Booster CMC", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, MS Office", details: "Adéquation de routes de tuyauterie, élaboration de supports spéciaux et positionnement de vannes. Levée de prix et contact fournisseurs.", skills: ["Piping", "Supports Design", "Procurement"] },
    { id: "VAL-13490", client: "VALE", title: "Dépoussiérage MAPU 230", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD (DWG)", details: "Mise en œuvre de dessins DWG. Élaboration de coupes pour arrangements mécaniques et de tuyauterie. Projet de base.", skills: ["Mécanique", "Tuyauterie", "Dessin Technique"] },
    { id: "LXS-11424", client: "LXS", title: "Dessins Mécaniques & Isométriques", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD, Isométriques", details: "Élaboration et adéquation de dessins mécaniques et d'isométriques. Projets conceptuel et de base.", skills: ["Mécanique", "Isométriques", "Conception"] }
  ];

  const nextProject = () => setSelectedProjectIdx((prev) => (prev + 1) % chemtechProjects.length);
  const prevProject = () => setSelectedProjectIdx((prev) => (prev - 1 + chemtechProjects.length) % chemtechProjects.length);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-12 md:pb-20">
      
      {/* Barre de progression sticky */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* HEADER RESPONSIVE AMÉLIORÉ */}
      <nav className="bg-[#003366] text-white p-4 md:p-8 shadow-xl sticky top-0 z-40 border-b-4 border-blue-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase italic">Eliandro Teles</h1>
            <p className="text-blue-200 font-bold text-xs md:text-lg italic">Ingénieur Support Technique | Candidature Vulcain</p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 px-3 md:px-6 py-1 md:py-2 rounded-full font-black italic text-xs md:text-base flex items-center gap-1 md:gap-2 animate-pulse">
            <Zap size={12} className="md:w-4 md:h-4"/> DISPONIBLE
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-3 md:p-6 space-y-5 md:space-y-10 mt-4 md:mt-8">

        {/* ROW DES 4 CARTES KPI (sans filtre) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-md border-b-4 border-blue-600 hover:-translate-y-1 transition-all hover:shadow-lg">
              <div className="bg-blue-50 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-3 md:mb-4">{kpi.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-[#003366]">{kpi.value}</div>
              <div className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">{kpi.label}</div>
              <div className="text-xs text-blue-600 font-bold mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* SECTION MD CONCEPT AVEC GRAPHIQUE ANIMÉ */}
        <section className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 md:p-8 opacity-5 text-green-600 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={80} className="md:w-[150px] md:h-[150px]" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl md:rounded-2xl text-white shadow-lg">
                <Briefcase size={18} className="md:w-6 md:h-6"/>
              </div>
              
               <div>
                  <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase italic leading-tight">
                    MD CONCEPT (BTP)
                  </h3>
                  <p className="text-[9px] md:text-sm font-bold tracking-widest uppercase text-gray-400 mt-1">
                    <span className="text-[#10B981] italic underline decoration-2 underline-offset-4">Chargé d'affaires</span> 
                    <span className="mx-2">•</span>
                    2022 — 2024 <span className="mx-1">•</span> France
                  </p>
                </div>
              
              {/*
                  <h3 className="text-lg md:text-2xl font-black text-[#003366] uppercase italic">MD Concept | Chargé d'affaires (2022-2024)</h3>
               */}
            
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8 items-center">
              <div className="lg:col-span-2 space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <Star size={14} className="md:w-4 md:h-4 fill-green-600"/>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider">Résultat clé</span>
                </div>
                <p className="text-sm md:text-lg text-slate-600 font-medium italic leading-relaxed">
                  "À mon arrivée, j'ai pris en charge la prospection active et la gestion client. Grâce à la standardisation des documents et à la qualité des propositions commerciales (modélisations 2D/3D), j'ai atteint un taux de signature de <span className="text-green-600 font-black text-lg md:text-2xl">1 devis sur 3</span>, augmentant significativement le chiffre d'affaires de la boîte."
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-green-200 text-center transform hover:scale-105 transition-all">
                <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                    <circle cx="50%" cy="50%" r="45%" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="189" className="transition-all duration-1000"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-2xl md:text-5xl font-black text-green-700 italic">33%</p>
                  </div>
                </div>
                <p className="text-[8px] md:text-[10px] font-black uppercase text-green-600 tracking-widest mt-2">Taux de Conversion</p>
                <p className="text-[10px] md:text-xs font-bold text-slate-500 mt-1">Signature sur rendez-vous</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION SIEMENS AVEC TEXTE ORIGINAL ET TOUS LES PROJETS */}
        <section className="bg-[#EFFFF6] p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-5 right-5 md:top-10 md:right-10 p-2 md:p-4 bg-white/50 rounded-full text-[#10B981] opacity-20">
            <Settings size={30} className="md:w-[60px] md:h-[60px]" strokeWidth={1} />
          </div>

          <div className="relative z-10 space-y-5 md:space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-[#10B981] rounded-xl md:rounded-2xl text-white shadow-lg shrink-0">
                  <Settings size={18} className="md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase italic leading-tight">
                    Chemtech (A Siemens Company)
                  </h3>
                  <p className="text-[9px] md:text-sm font-bold tracking-widest uppercase text-gray-400 mt-1">
                    <span className="text-[#10B981] italic underline decoration-2 underline-offset-4">Engineering Support / Piping</span> 
                    <span className="mx-2">•</span>
                    2012 — 2014 <span className="mx-1">•</span> Brésil
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedProjectIdx(0)}
                className="inline-flex items-center gap-1.5 md:gap-2.5 px-3 py-1.5 md:px-5 md:py-2.5 bg-white border border-gray-100 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest text-[#003366] hover:bg-[#003366] hover:text-white transition-all shadow-sm active:scale-95"
              >
                <Search size={12} className="md:w-4 md:h-4 shrink-0" />
                VOIR RÉALISATIONS ({chemtechProjects.length}+)
              </button>
            </div>

            {/* TEXTE ORIGINAL RESTAURÉ */}
            <div className="bg-white/60 p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/80 max-w-4xl">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium italic">
                "Support technique sur 15+ projets Oil & Gas pour des clients majeurs comme <strong className="text-[#003366]">Petrobras</strong>, <strong className="text-[#003366]">Vale</strong> et <strong className="text-[#003366]">CSN</strong>. Expertise reconnue en modélisation 3D (PDMS/AutoCAD), extraction d'isométriques et conformité HSE (normes NR) sans aucune non-conformité."
              </p>
            </div>

            {/* TIMELINE DES PROJETS (TOUS LES 17) */}
            <div className="mt-4 md:mt-6">
              <div className="flex items-center gap-2 text-[#10B981] mb-3 md:mb-4">
                <Clock size={14} className="md:w-4 md:h-4"/>
                <span className="text-[9px] md:text-xs font-black uppercase tracking-wider">Parcours 2012 → 2014</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 max-h-80 md:max-h-96 overflow-y-auto p-1">
                {chemtechProjects.map((project, idx) => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProjectIdx(idx)}
                    className="bg-white p-3 md:p-4 rounded-xl border-l-4 border-[#10B981] hover:shadow-lg transition-all cursor-pointer active:scale-98"
                  >
                    <div className="flex justify-between items-start mb-1 md:mb-2">
                      <span className="text-[8px] md:text-[10px] font-black text-[#10B981] uppercase">{project.client}</span>
                      <span className="text-[7px] md:text-[9px] text-gray-400">{project.period}</span>
                    </div>
                    <h4 className="font-bold text-[#003366] text-xs md:text-sm mb-1 md:mb-2 line-clamp-2">{project.title}</h4>
                    <div className="flex flex-wrap gap-1 mt-1 md:mt-2">
                      {project.skills.slice(0, 2).map(skill => (
                        <span key={skill} className="text-[7px] md:text-[8px] bg-gray-100 px-1.5 py-0.5 md:px-2 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LOGICIELS & IA EN VERSION RESPONSIVE */}
        <section className="bg-gradient-to-r from-[#003366] to-blue-900 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] text-white">
          <h3 className="text-base md:text-xl font-black mb-5 md:mb-8 uppercase italic flex items-center gap-2 md:gap-3">
            <Database size={16} className="md:w-6 md:h-6"/> Stack Technique & Outils
          </h3>
          
          <div className="space-y-5 md:space-y-8">
            <div>
              <p className="text-blue-300 font-black text-[8px] md:text-[10px] uppercase mb-2 md:mb-4 tracking-widest">CAO & Modélisation</p>
              <div className="flex flex-wrap gap-1.5 md:gap-3">
                {["PDMS", "AutoCAD", "SolidWorks", "FluidSim", "NX"].map((s, i) => (
                  <span key={s} className={`bg-white/10 px-2 py-1 md:px-4 md:py-2 rounded-lg font-bold transition-all hover:scale-105 ${
                    i === 0 ? 'text-xs md:text-lg' : 'text-[10px] md:text-base'
                  }`}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-300 font-black text-[8px] md:text-[10px] uppercase mb-2 md:mb-4 tracking-widest">Analyse & Recherche</p>
              <div className="flex flex-wrap gap-1.5 md:gap-3">
                {["X'Pert HighScore Plus", "VESTA", "SigmaPlot", "Statistica"].map(s => (
                  <span key={s} className="bg-white/10 px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[9px] md:text-xs font-bold hover:scale-105 transition-all">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-300 font-black text-[8px] md:text-[10px] uppercase mb-2 md:mb-4 tracking-widest">Gestion & Innovation</p>
              <div className="flex flex-wrap gap-1.5 md:gap-3">
                {["MS Project", "ClickUp", "n8n (Automation)", "LLM/RAG"].map(s => (
                  <span key={s} className="bg-blue-500/30 px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[9px] md:text-xs font-bold border border-blue-400/30 hover:scale-105 transition-all">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sticky CTA flottant (optimisé mobile) */}
        <div className="fixed bottom-3 md:bottom-8 right-3 md:right-8 z-40">
          <a href="/Dossier Technique - Eliandro Teles.pdf" download >
            
          {/* <button className="bg-gradient-to-r from-[#002B49] to-blue-800 text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full font-black text-[10px] md:text-base shadow-2xl flex items-center gap-1 md:gap-2 hover:scale-105 transition-all active:scale-95">
             📄 Dossier <span className="hidden sm:inline">Technique</span> <ChevronRight size={12} className="md:w-5 md:h-5" />
          </button> */}

             <button className="bg-gradient-to-r from-blue-600 to-green-600 px-3 md:px-6 py-1 md:py-2 rounded-full font-black italic text-xs md:text-base flex items-center gap-1 md:gap-2 animate-pulse">
            <Zap size={14} className="md:w-4 md:h-4"/> 📄 Dossier <span className="hidden sm:inline">Technique</span> <ChevronRight size={14} className="md:w-5 md:h-5" />
          </button>
            
             </a>
        </div>

        {/* FOOTER RESPONSIVE */}
        <footer className="bg-gradient-to-r from-[#002B49] to-blue-800 p-5 md:p-8 rounded-2xl md:rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-2xl font-bold">Prêt à relever les défis de Vulcain</h4>
            <p className="text-blue-200 opacity-80 mt-0.5 md:mt-1 uppercase tracking-tighter font-medium text-[10px] md:text-base">Ingénierie • Support • Excellence</p>
          </div>
          <div className="flex gap-2 md:gap-3">
            <a href="https://site-eliandro.vercel.app/" target="_blank" rel="noopener noreferrer">
            <button className="bg-white text-[#002B49] hover:bg-blue-50 px-3 py-1.5 md:px-6 md:py-3 rounded-full font-black text-[10px] md:text-base shadow-lg flex items-center gap-1 md:gap-2 transition-all active:scale-95">
              Site/Portfolio <ChevronRight size={10} className="md:w-5 md:h-5" />
            </button>
               </a>
            <button className="border-2 border-white px-3 py-1.5 md:px-6 md:py-3 rounded-full font-black text-[10px] md:text-base hover:bg-white/10 transition-all active:scale-95">
              <a href="https://www.linkedin.com/in/eliandro-teles/" target="_blank" rel="noopener noreferrer">
              LinkedIn
              </a>
            </button>
          </div>
        </footer>

      </main>

      {/* MODAL CARROUSEL RESPONSIVE ULTRA OPTIMISÉE */}
      {selectedProjectIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[95%] md:max-w-2xl rounded-xl md:rounded-[2.5rem] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="sticky top-0 bg-white z-10 p-3 md:p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="space-y-1 w-full pr-8">
                  <div className="flex items-center justify-between w-full">
                    <span className="bg-[#003366] text-white px-2 md:px-4 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em]">
                      Projet {selectedProjectIdx + 1} / {chemtechProjects.length}
                    </span>
                    <span className="text-slate-400 font-bold text-[7px] md:text-[10px] tracking-widest uppercase">
                      ID: {chemtechProjects[selectedProjectIdx].id}
                    </span>
                  </div>
                  <h3 className="text-[#10B981] font-black text-[9px] md:text-sm uppercase tracking-[0.2em] pt-2 md:pt-4">
                    CLIENT : {chemtechProjects[selectedProjectIdx].client}
                  </h3>
                  <h2 className="text-xl md:text-4xl font-black text-[#003366] uppercase italic leading-tight">
                    {chemtechProjects[selectedProjectIdx].title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-[8px] md:text-xs uppercase pt-1">
                    <Calendar size={10} className="md:w-3.5 md:h-3.5" />
                    <span>{chemtechProjects[selectedProjectIdx].period}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedProjectIdx(null)} className="absolute top-3 right-3 md:top-6 md:right-6 p-1 text-slate-300 hover:text-red-500">
                  <X size={20} className="md:w-9 md:h-9"/>
                </button>
              </div>
            </div>

            <div className="p-4 md:p-10 space-y-4 md:space-y-6">
              <div className="bg-emerald-50/50 p-3 md:p-5 rounded-xl md:rounded-2xl border border-emerald-100">
                <p className="text-[8px] md:text-[10px] font-black text-[#10B981] uppercase mb-1 tracking-widest flex items-center gap-2">
                  <Target size={10} className="md:w-3 md:h-3"/> Contexte Opérationnel
                </p>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium italic">
                  {generateProjectSummary(chemtechProjects[selectedProjectIdx])}
                </p>
              </div>

              <div className="bg-slate-50 p-4 md:p-8 rounded-xl md:rounded-[2rem] border-l-4 md:border-l-8 border-[#10B981]">
                <p className="text-sm md:text-xl font-medium italic text-slate-700 leading-relaxed">
                  "{chemtechProjects[selectedProjectIdx].details.split('[cite')[0].trim()}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-10 border-t border-gray-100 pt-4 md:pt-6">
                <div>
                  <p className="text-[7px] md:text-[10px] font-black text-[#10B981] uppercase mb-0.5 md:mb-1 tracking-widest">Poste occupé</p>
                  <p className="font-bold text-[#003366] text-xs md:text-lg italic">{chemtechProjects[selectedProjectIdx].role}</p>
                </div>
                <div>
                  <p className="text-[7px] md:text-[10px] font-black text-[#10B981] uppercase mb-0.5 md:mb-1 tracking-widest">Stack Logicielle</p>
                  <p className="font-bold text-[#003366] text-xs md:text-lg italic">{chemtechProjects[selectedProjectIdx].tools}</p>
                </div>
              </div>
            </div>

            {/* Navigation mobile améliorée */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-3 md:p-6 flex justify-between gap-3">
              <button onClick={prevProject} className="flex-1 bg-gray-100 hover:bg-[#10B981] text-[#003366] hover:text-white py-2 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2">
                <ChevronLeft size={16} /> Précédent
              </button>
              <button onClick={nextProject} className="flex-1 bg-gray-100 hover:bg-[#10B981] text-[#003366] hover:text-white py-2 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2">
                Suivant <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardVulcain;
