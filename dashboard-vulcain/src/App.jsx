import React, { useState } from 'react';
import { 
  Settings, ShieldCheck, PenTool, Globe, ChevronRight, ChevronLeft, 
  Briefcase, X, Calendar, MapPin, CheckCircle, TrendingUp, Target, Database, MousePointer2,
  Search // <-- J'ai ajouté l'import manquant ici
} from 'lucide-react';

const generateProjectSummary = (project) => {
  const summaries = {
    "PETROBRAS": "Optimisation d'infrastructures critiques pour la production d'énergie et le raffinage, nécessitant une précision absolue en modélisation 3D et une gestion rigoureuse des flux de tuyauterie.",
    "VALE": "Amélioration de la sécurité opérationnelle et de l'efficacité logistique sur des sites miniers et industriels de grande envergure, avec un focus majeur sur la conformité HSE.",
    "CSN": "Accompagnement de l'expansion de capacités sidérurgiques via la réorganisation mécanique et l'intégration de nouveaux équipements lourds en environnement contraint.",
    "default": "Support technique multidisciplinaire visant à garantir la conformité réglementaire et l'excellence opérationnelle sur des projets d'ingénierie complexes."
  };
  
  const text = summaries[project.client] || summaries.default;
  // Nettoyage de sécurité au cas où une balise s'y glisse
  return text.split('[cite')[0].trim();
};

const DashboardVulcain = () => {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);

  // --- 1. LES 4 KPI CARDS (VOTRE DEMANDE) ---
  const kpis = [
    { 
      label: "Projets Pétrole & Gaz", 
      value: "15+", 
      sub: "Expertise Chemtech/Siemens", 
      icon: <Settings className="text-blue-600" /> 
    },
    { 
      label: "Conformité HSE", 
      value: "100%", 
      sub: "Normes NR & Rigueur", 
      icon: <ShieldCheck className="text-green-600" /> 
    },
    { 
      label: "Logiciels CAO/Tech", 
      value: "12+", 
      sub: "PDMS, Vesta, HighScore...", 
      icon: <PenTool className="text-blue-600" /> 
    },
    { 
      label: "Langues", 
      value: "3", 
      sub: "PT (Nat), FR (Cour), EN (Tech)", 
      icon: <Globe className="text-blue-600" /> 
    }
  ];

  // --- 2. DONNÉES SIEMENS (CAROUSEL) ---
  const chemtechProjects = [
  {
    id: "PBR-09410",
    client: "PETROBRAS",
    title: "Centrale Thermique UTE SEPE TIARAJU",
    period: "2012 - 2015",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, AutoCAD, MS Office",
    details: "Modélisation complète (Civil, Équipements, Tuyauterie, Métallique, Électrique). Extraction, révision et exécution d'isométriques et de documents de flexibilité.",
    skills: ["Modélisation 3D", "Piping", "Isométriques"]
  },
  {
    id: "FWR-10397",
    client: "FEED PREMIUM ONSITE",
    title: "Support Technique Ingénierie",
    period: "2012",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, Isométriques",
    details: "Adéquation, extraction, révision et exécution d'isométriques et de documents de flexibilité.",
    skills: ["Piping", "Flexibilité"]
  },
  {
    id: "PBR-10330",
    client: "PETROBRAS",
    title: "EBDMOTOB & EDAdeqLogist",
    period: "2012 - 2013",
    role: "Stagiaire Support d’Ingénierie",
    tools: "AutoCAD, PDMS",
    details: "Adéquation technique, révision d'isométriques et support aux documents de flexibilité pour la logistique.",
    skills: ["Logistique technique", "Isométriques"]
  },
  {
    id: "VAL-11622",
    client: "VALE",
    title: "ABASLOCO",
    period: "2013",
    role: "Stagiaire Support d’Ingénierie",
    tools: "AutoCAD (DWG)",
    details: "Exécution et correction de plans techniques et de fichiers DWG pour le projet.",
    skills: ["Dessin Technique", "AutoCAD"]
  },
  {
    id: "PBR-10056",
    client: "PETROBRAS",
    title: "Revamp U-280 PD",
    period: "2012",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, AutoCAD",
    details: "Support à la modélisation pour le projet de Revamping. Extraction et révision d'isométriques.",
    skills: ["Revamping", "Piping"]
  },
  {
    id: "PTC-12001",
    client: "PTC",
    title: "EBD Coger",
    period: "2012",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, Isométriques",
    details: "Travaux d'adéquation et exécution de documents de flexibilité et isométriques.",
    skills: ["Piping", "Support Technique"]
  },
  {
    id: "UNE-11651",
    client: "UNE",
    title: "UTCS UTGC",
    period: "2012 - 2013",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, AutoCAD",
    details: "Révision et exécution d'isométriques et de documents de flexibilité.",
    skills: ["Tuyauterie", "Flexibilité"]
  },
  {
    id: "PBR-11693",
    client: "PETROBRAS",
    title: "PDMS COMOS",
    period: "2013",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, COMOS",
    details: "Levé de terrain virtuel et intégration de données techniques.",
    skills: ["Virtual Survey", "Data Integration"]
  },
  {
    id: "VAL-11601",
    client: "VALE",
    title: "Analyse Santé & Sécurité (HSE) São Luis",
    period: "2012 - 2015",
    role: "Stagiaire Support d’Ingénierie",
    tools: "Normes NR, MS Office",
    details: "Élaboration de formulaires d'évaluation des risques. Analyse de conformité selon les normes NR et marquage de copies physiques.",
    skills: ["HSE", "Audit", "Normes NR"]
  },
  {
    id: "VAL-12549",
    client: "VALE",
    title: "Nouveau Poste de Maintenance",
    period: "2013",
    role: "Stagiaire Support d’Ingénierie",
    tools: "AutoCAD, Excel",
    details: "Recherche et remplissage de listes de matériels (BOM). Élaboration et correction de fichiers DWG.",
    skills: ["BOM", "AutoCAD"]
  },
  {
    id: "CON-12584",
    client: "CON",
    title: "ADEXERNS - Modélisation Supports",
    period: "2013",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, AutoCAD",
    details: "Modélisation de supports pour lignes fines et équipements. Maquettage d'isométriques et documentation générale.",
    skills: ["Supports", "Detailing"]
  },
  {
    id: "BSK-09274",
    client: "VAL-UO1-PD",
    title: "Fontes GM - Support Tuyauterie",
    period: "2013",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, Isométriques",
    details: "Traitement et adéquation d'isométriques pour les lignes de production.",
    skills: ["Tuyauterie", "Isométriques"]
  },
  {
    id: "BSF-13157",
    client: "BSF",
    title: "F265 J200 - Locação Equipamentos",
    period: "2014",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, AutoCAD",
    details: "Modélisation et positionnement d'équipements industriels conformément aux plans d'implantation.",
    skills: ["3D Modeling", "Plant Layout"]
  },
  {
    id: "CSN-13139",
    client: "CSN",
    title: "Expansion Phase 2 - Sidérurgie",
    period: "2014 - 2015",
    role: "Stagiaire Support d’Ingénierie",
    tools: "AutoCAD (DWG), MS Office",
    details: "Arrangements mécaniques, moyens de passage et repositionnement d'équipements lourds. Élaboration de listes de matériels (BOM). Projets de base et détaillé.",
    skills: ["Mécanique", "BOM", "Layout Design"]
  },
  {
    id: "VAL-13546",
    client: "VALE",
    title: "Système de Pompage Booster CMC",
    period: "2014",
    role: "Stagiaire Support d’Ingénierie",
    tools: "PDMS, MS Office",
    details: "Adéquation de routes de tuyauterie, élaboration de supports spéciaux et positionnement de vannes. Levée de prix et contact fournisseurs.",
    skills: ["Piping", "Supports Design", "Procurement"]
  },
  {
    id: "VAL-13490",
    client: "VALE",
    title: "Dépoussiérage MAPU 230",
    period: "2014",
    role: "Stagiaire Support d’Ingénierie",
    tools: "AutoCAD (DWG)",
    details: "Mise en œuvre de dessins DWG. Élaboration de coupes pour arrangements mécaniques et de tuyauterie. Projet de base.",
    skills: ["Mécanique", "Tuyauterie", "Dessin Technique"]
  },
  {
    id: "LXS-11424",
    client: "LXS",
    title: "Dessins Mécaniques & Isométriques",
    period: "2014",
    role: "Stagiaire Support d’Ingénierie",
    tools: "AutoCAD, Isométriques",
    details: "Élaboration et adéquation de dessins mécaniques et d'isométriques. Projets conceptuel et de base.",
    skills: ["Mécanique", "Isométriques", "Conception"]
  }
];

  const nextProject = () => setSelectedProjectIdx((prev) => (prev + 1) % chemtechProjects.length);
  const prevProject = () => setSelectedProjectIdx((prev) => (prev - 1 + chemtechProjects.length) % chemtechProjects.length);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20">
      
      {/* HEADER */}
      <nav className="bg-[#003366] text-white p-8 shadow-xl sticky top-0 z-40 border-b-4 border-blue-500">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Eliandro Pereira Teles</h1>
            <p className="text-blue-200 font-bold text-lg italic">Ingénieur Support Technique | Candidature Vulcain</p>
          </div>
          <div className="hidden md:flex bg-blue-600 px-6 py-2 rounded-full font-black italic items-center gap-2">
            <CheckCircle size={16}/> DISPONIBLE
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-10 mt-8">

        {/* ROW DES 4 CARTES KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-blue-600 hover:-translate-y-1 transition-all">
              <div className="bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">{kpi.icon}</div>
              <div className="text-4xl font-black text-[#003366]">{kpi.value}</div>
              <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">{kpi.label}</div>
              <div className="text-xs text-blue-600 font-bold mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* SECTION MD CONCEPT : IMPACT BUSINESS */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-green-600"><TrendingUp size={150} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-600 rounded-2xl text-white shadow-lg"><Briefcase size={24}/></div>
              <h3 className="text-2xl font-black text-[#003366] uppercase italic">MD Concept | Chargé d’affaires (2022-2024)</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-lg text-slate-600 font-medium italic leading-relaxed">
                  "À mon arrivée, j'ai pris en charge la prospection active et la gestion client. Grâce à la standardisation des documents et à la qualité des propositions commerciales (modélisations 2D/3D), j'ai atteint un taux de signature de <span className="text-green-600 font-black">1 devis sur 3</span>, augmentant significativement le chiffre d'affaires de la boîte."
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-3xl border border-green-100 text-center">
                <p className="text-5xl font-black text-green-700 italic">33%</p>
                <p className="text-[10px] font-black uppercase text-green-600 tracking-widest mt-2">Taux de Conversion</p>
                <p className="text-xs font-bold text-slate-500 mt-1">Signature sur rendez-vous</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION SIEMENS : PORTFOLIO PROJETS (Design Aligné sur MD Concept) --- */}
<section className="bg-[#EFFFF6] p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
  {/* L'icône technique dans un cercle, alignée sur le style MD Concept */}
  <div className="absolute top-10 right-10 p-4 bg-white/50 rounded-full text-[#10B981] opacity-20 group-hover:opacity-100 transition-opacity">
    <Settings size={60} strokeWidth={1} />
  </div>

  <div className="relative z-10 space-y-8">
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      <div className="flex items-center gap-4">
        {/* L'icône principale dans son cercle vert */}
        <div className="p-4 bg-[#10B981] rounded-2xl text-white shadow-lg shrink-0">
          <Settings size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#003366] uppercase italic leading-tight">
            Chemtech (Siemens Group)
          </h3>
          <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mt-1">
            <span className="text-[#10B981] italic underline decoration-2 underline-offset-4">
              Engineering Support / Piping
            </span> 
            <span className="mx-2">•</span>
            2012 — 2015 <span className="mx-1">•</span> Brésil
          </p>
        </div>
      </div>

      {/* Bouton "Tag" épuré, aligné à droite */}
      <button 
        onClick={() => setSelectedProjectIdx(0)} // Ouvre la modal
        className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-gray-100 rounded-full text-xs font-black uppercase tracking-widest text-[#003366] hover:bg-[#003366] hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
      >
        <Search size={16} className="shrink-0" />
        VOIR RÉALISATIONS (15+)
      </button>
    </div>

    {/* Le texte descriptif, aligné sur le style MD Concept */}
    <div className="bg-white/60 p-6 rounded-2xl border border-white/80 max-w-4xl">
      <p className="text-slate-600 leading-relaxed text-base font-medium italic">
        "Support technique sur 15+ projets Oil & Gas pour des clients majeurs comme <strong className="text-[#003366]">Petrobras</strong>, <strong className="text-[#003366]">Vale</strong> et <strong className="text-[#003366]">CSN</strong>. Expertise reconnue en modélisation 3D (PDMS/AutoCAD), extraction d'isométriques et conformité HSE (normes NR) sans aucune non-conformité."
      </p>
    </div>
  </div>
</section>

        {/* LOGICIELS & IA */}
        <section className="bg-[#003366] p-10 rounded-[2.5rem] text-white">
          <h3 className="text-xl font-black mb-8 uppercase italic flex items-center gap-3">
            <Database size={24}/> Stack Technique & Outils
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-blue-300 font-black text-[10px] uppercase mb-4 tracking-widest">CAO & Modélisation</p>
              <div className="flex flex-wrap gap-2">
                {["PDMS", "AutoCAD", "SolidWorks", "FluidSim", "NX"].map(s => (
                  <span key={s} className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-300 font-black text-[10px] uppercase mb-4 tracking-widest">Analyse & Recherche</p>
              <div className="flex flex-wrap gap-2">
                {["X’Pert HighScore Plus", "VESTA", "SigmaPlot", "Statistica"].map(s => (
                  <span key={s} className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-300 font-black text-[10px] uppercase mb-4 tracking-widest">Gestion & Innovation</p>
              <div className="flex flex-wrap gap-2">
                {["MS Project", "ClickUp", "n8n (Automation)", "LLM/RAG"].map(s => (
                  <span key={s} className="bg-blue-500/30 px-3 py-1 rounded-lg text-xs font-bold border border-blue-400/30">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gradient-to-r from-[#002B49] to-blue-800 p-8 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold">Prêt à relever les défis de Vulcain</h4>
            <p className="text-blue-200 opacity-80 mt-1 uppercase tracking-tighter font-medium">Ingénierie • Support • Excellence</p>
          </div>
          <button className="bg-white text-[#002B49] hover:bg-blue-50 px-10 py-4 rounded-full font-black text-lg shadow-lg flex items-center gap-3 transition-all hover:gap-5">
            Dossier Technique Complet <ChevronRight size={20} />
          </button>
        </footer>

      </main>

{/* --- MODAL CAROUSEL EXPERT (VERSION NETTOYÉE ET COMPLÈTE) --- */}
{selectedProjectIdx !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-visible relative">
      
      {/* Navigation externe sans gêne visuelle */}
      <div className="absolute inset-y-0 -left-6 -right-6 flex items-center justify-between pointer-events-none">
        <button onClick={prevProject} className="p-4 bg-white hover:bg-[#10B981] text-[#003366] hover:text-white rounded-full transition-all pointer-events-auto shadow-xl border border-gray-100">
          <ChevronLeft size={28}/>
        </button>
        <button onClick={nextProject} className="p-4 bg-white hover:bg-[#10B981] text-[#003366] hover:text-white rounded-full transition-all pointer-events-auto shadow-xl border border-gray-100">
          <ChevronRight size={28}/>
        </button>
      </div>

      <div className="p-10">
        {/* Header : Compteur, Client (Emphase) et ID */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1 w-full">
            <div className="flex items-center justify-between w-full pr-8">
              <span className="bg-[#003366] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                Projet {selectedProjectIdx + 1} / {chemtechProjects.length}
              </span>
              <span className="text-slate-400 font-bold text-[10px] tracking-widest uppercase">
                ID: {chemtechProjects[selectedProjectIdx].id}
              </span>
            </div>
            
            {/* Emphase forte sur le Client */}
            <h3 className="text-[#10B981] font-black text-sm uppercase tracking-[0.3em] pt-4">
              CLIENT : {chemtechProjects[selectedProjectIdx].client}
            </h3>
            
            <h2 className="text-4xl font-black text-[#003366] uppercase italic leading-tight">
              {chemtechProjects[selectedProjectIdx].title}
            </h2>
            
            <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase pt-1">
              <Calendar size={14} />
              <span>{chemtechProjects[selectedProjectIdx].period}</span>
            </div>
          </div>
          
          <button onClick={() => setSelectedProjectIdx(null)} className="absolute top-8 right-8 p-2 text-slate-300 hover:text-red-500 transition-colors">
            <X size={36}/>
          </button>
        </div>

        <div className="space-y-6">
          {/* Résumé contextuel (Explication brève du projet) */}
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
            <p className="text-[10px] font-black text-[#10B981] uppercase mb-2 tracking-widest flex items-center gap-2">
              <Target size={12} /> Contexte Opérationnel
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
              {generateProjectSummary(chemtechProjects[selectedProjectIdx])}
            </p>
          </div>

          {/* Détails techniques - Nettoyage sécurisé pour éviter l'erreur de déploiement */}
<div className="bg-slate-50 p-8 rounded-[2rem] border-l-8 border-[#10B981]">
   <p className="text-xl font-medium italic text-slate-700 leading-relaxed">
    "{chemtechProjects[selectedProjectIdx].details.split('[cite')[0].trim()}"
  </p>
</div>

          {/* Footer technique */}
          <div className="grid grid-cols-2 gap-10 border-t border-gray-100 pt-6">
            <div>
              <p className="text-[10px] font-black text-[#10B981] uppercase mb-1 tracking-widest">Poste occupé</p>
              <p className="font-bold text-[#003366] text-lg italic">{chemtechProjects[selectedProjectIdx].role}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-[#10B981] uppercase mb-1 tracking-widest">Stack Logicielle</p>
              <p className="font-bold text-[#003366] text-lg italic">{chemtechProjects[selectedProjectIdx].tools}</p>
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