import React, { useState, useEffect, useMemo } from 'react';
import { 
  Settings, ShieldCheck, PenTool, Globe, ChevronRight, ChevronLeft, 
  Briefcase, X, Calendar, CheckCircle, TrendingUp, Target, Database,
  Search, Clock, Award, Zap, Star, BarChart3, Activity, 
  Github as GithubIcon, Linkedin as LinkedinIcon, ExternalLink 
} from 'lucide-react';

// Fonction de génération de contexte (restaurée)
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // --- LES 20 PROJETS COMPLETS (Base Chemtech) ---
  const chemtechProjects = [
    { id: "PBR-09410", client: "PETROBRAS", title: "Centrale Thermique UTE SEPE TIARAJU", period: "2012 - 2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD, MS Office", details: "Modélisation complète (Civil, Équipements, Tuyauterie, Métallique, Électrique). Extraction, révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Modélisation 3D", "Piping", "Isométriques"] },
    { id: "FWR-10397", client: "FEED PREMIUM ONSITE", title: "Support Technique Ingénierie", period: "2012", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, Isométriques", details: "Adéquation, extraction, révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Piping", "Flexibilité"] },
    { id: "PBR-10330", client: "PETROBRAS", title: "EBDMOTOB & EDAdeqLogist", period: "2012 - 2013", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD, PDMS", details: "Adéquation technique, révision d'isométriques et support aux documents de flexibilité pour la logistique.", skills: ["Logistique technique", "Isométriques"] },
    { id: "VAL-11622", client: "VALE", title: "ABASLOCO", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD (DWG)", details: "Exécution et correction de plans techniques et de fichiers DWG pour le projet.", skills: ["Dessin Technique", "AutoCAD"] },
    { id: "PBR-10056", client: "PETROBRAS", title: "Revamp U-280 PD", period: "2012", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Support à la modélisation pour le projet de Revamping. Extraction et révision d'isométriques.", skills: ["Revamping", "Piping"] },
    { id: "PTC-12001", client: "PTC", title: "EBD Coger", period: "2012", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, Isométriques", details: "Travaux d'adéquation et exécution de documents de flexibilité et isométriques.", skills: ["Piping", "Support Technique"] },
    { id: "UNE-11651", client: "UNE", title: "UTCS UTGC", period: "2012 - 2013", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Tuyauterie", "Flexibilité"] },
    { id: "PBR-11693", client: "PETROBRAS", title: "PDMS COMOS", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, COMOS", details: "Levé de terrain virtuel et intégration de données techniques.", skills: ["Virtual Survey", "Data Integration"] },
    { id: "VAL-11601", client: "VALE", title: "Analyse Santé & Sécurité (HSE) São Luis", period: "2012 - 2014", role: "Stagiaire Support d'Ingénierie", tools: "Normes NR, MS Office", details: "Élaboration de formulaires d'évaluation des risques. Analyse de conformité selon les normes NR.", skills: ["HSE", "Audit", "Normes NR"] },
    { id: "VAL-12549", client: "VALE", title: "Nouveau Poste de Maintenance", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD, Excel", details: "Recherche et remplissage de listes de matériels (BOM). Élaboration et correction de fichiers DWG.", skills: ["BOM", "AutoCAD"] },
    { id: "CON-12584", client: "CON", title: "ADEXERNS - Modélisation Supports", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Modélisation de supports pour lignes fines et équipements. Maquettage d'isométriques.", skills: ["Supports", "Detailing"] },
    { id: "BSK-09274", client: "VAL-UO1-PD", title: "Fontes GM - Support Tuyauterie", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, Isométriques", details: "Traitement et adéquation d'isométriques pour les lignes de production.", skills: ["Tuyauterie", "Isométriques"] },
    { id: "BSF-13157", client: "BSF", title: "F265 J200 - Locação Equipamentos", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Modélisation et positionnement d'équipements industriels conformément aux plans d'implantation.", skills: ["3D Modeling", "Plant Layout"] },
    { id: "CSN-13139", client: "CSN", title: "Expansion Phase 2 - Sidérurgie", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD (DWG), MS Office", details: "Arrangements mécaniques, moyens de passage et repositionnement d'équipements lourds.", skills: ["Mécanique", "BOM", "Layout Design"] },
    { id: "VAL-13546", client: "VALE", title: "Système de Pompage Booster CMC", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, MS Office", details: "Adéquation de routes de tuyauterie, élaboration de supports spéciaux et positionnement de vannes.", skills: ["Piping", "Supports Design", "Procurement"] },
    { id: "VAL-13490", client: "VALE", title: "Dépoussiérage MAPU 230", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD (DWG)", details: "Mise en œuvre de dessins DWG. Élaboration de coupes pour arrangements mécaniques.", skills: ["Mécanique", "Tuyauterie", "Dessin Technique"] },
    { id: "LXS-11424", client: "LXS", title: "Dessins Mécaniques & Isométriques", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "AutoCAD, Isométriques", details: "Élaboration et adéquation de dessins mécaniques et d'isométriques.", skills: ["Mécanique", "Isométriques", "Conception"] },
    // Les 3 manquants ajoutés :
    { id: "MJR-13169", client: "MJR", title: "MTOURE COMPERJ", period: "2013", role: "Stagiaire Support d'Ingénierie", tools: "Excel, PDMS", details: "Gestion des listes de matériels et support à l'extraction de données de la maquette 3D.", skills: ["MTO", "Data Management"] },
    { id: "PBR-12045", client: "PETROBRAS", title: "Unité de Traitement Gaz Naturel", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Support à l'ingénierie de détail pour les systèmes de tuyauterie auxiliaires.", skills: ["Gaz Naturel", "Detail Engineering"] },
    { id: "VAL-14002", client: "VALE", title: "Audit Infrastructures São Luis", period: "2014", role: "Stagiaire Support d'Ingénierie", tools: "Normes NR", details: "Vérification sur site de la conformité des installations par rapport à la maquette numérique.", skills: ["Audit Site", "As-Built"] }
  ];

  // Logique de recherche filtrée
  const filteredProjects = useMemo(() => {
    return chemtechProjects.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, chemtechProjects]);

  const stats = [
    { label: "Missions Petrobras", value: "9", icon: <Activity className="text-blue-600" />, color: "bg-blue-50" },
    { label: "Projets Vale/Mining", value: "7", icon: <Database className="text-green-600" />, color: "bg-green-50" },
    { label: "Total Projets", value: "20", icon: <BarChart3 className="text-yellow-600" />, color: "bg-yellow-50" },
    { label: "Non-conformités HSE", value: "0", icon: <ShieldCheck className="text-emerald-600" />, color: "bg-emerald-50" }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 pb-12">
      {/* 1. BARRE DE PROGRESSION */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-50">
        <div className="h-full bg-gradient-to-r from-[#003366] to-[#10B981] transition-all" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* 2. HEADER & LIENS SOCIAUX */}
      <nav className="bg-[#003366] text-white p-6 md:p-10 shadow-2xl sticky top-0 z-40 border-b-4 border-[#10B981]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">Eliandro Teles</h1>
            <p className="text-blue-200 font-bold text-xs md:text-lg uppercase tracking-widest mt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
              Expert Support Ingénierie • Chemtech / Siemens
            </p>
          </div>

          {/* BOUTONS SOCIAUX & PORTFOLIO */}
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://votre-site-portfolio.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10" title="Portfolio">
              <ExternalLink size={20} />
            </a>
            <a href="https://linkedin.com/in/eliandro-teles/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition-all border border-white/10" title="LinkedIn">
               <LinkedinIcon size={20} />
            </a>
            <a href="https://github.com/votre-compte" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-slate-800 rounded-xl transition-all border border-white/10" title="GitHub">
             <GithubIcon size={20}
            </a>

            
            <div className="bg-[#10B981] text-white px-5 py-2 rounded-xl font-black italic shadow-lg flex items-center gap-2 text-sm">
              <Zap size={16} /> DISPONIBLE
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* STATS GRID */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
              <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>{stat.icon}</div>
              <div className="text-3xl font-black text-[#003366]">{stat.value}</div>
              <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* PROJECT CONSOLE */}
        <section className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Colonne Gauche Identité */}
            <div className="lg:col-span-4 p-8 bg-slate-50 border-r border-slate-100">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-[#003366] rounded-full text-[10px] font-black uppercase mb-6">
                <Star size={12} className="fill-[#003366]"/> Expérience Focus
              </div>
              <h2 className="text-3xl font-black text-[#003366] italic uppercase mb-6 leading-tight">Chemtech <br/><span className="text-[#10B981]">Siemens</span></h2>
              <p className="text-slate-600 text-sm font-medium italic leading-relaxed mb-8">
                Maîtrise complète de la chaîne de support technique ingénierie en environnement industriel hautement réglementé.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase">KPI Conformité</span>
                   <span className="text-[#10B981] font-black">PASS</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite Matrice avec Recherche */}
            <div className="lg:col-span-8 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Project_Console_v2.0</h3>
                
                <div className="flex items-center gap-2">
                  {isSearchVisible && (
                    <input 
                      type="text" 
                      placeholder="Chercher client, titre..." 
                      className="text-xs p-2 border-b-2 border-blue-600 outline-none animate-in slide-in-from-right-4"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  )}
                  <button 
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                    className={`p-2 rounded-full transition-all ${isSearchVisible ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}
                  >
                    <Search size={18}/>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredProjects.length > 0 ? filteredProjects.map((project, idx) => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProjectIdx(chemtechProjects.findIndex(p => p.id === project.id))}
                    className="group bg-slate-50 hover:bg-[#003366] p-5 rounded-3xl border border-slate-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[8px] font-black px-2 py-1 bg-white group-hover:bg-[#10B981] text-[#003366] rounded uppercase">{project.client}</span>
                      <span className="text-[9px] font-bold text-slate-400 group-hover:text-blue-200">{project.period}</span>
                    </div>
                    <h4 className="font-black text-[#003366] group-hover:text-white text-xs uppercase italic line-clamp-2">{project.title}</h4>
                  </div>
                )) : (
                  <div className="col-span-2 text-center py-20 text-slate-400 italic">Aucun projet ne correspond à votre recherche.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. MODAL DE DÉTAIL AVEC CONTEXTE OPÉRATIONNEL */}
      {selectedProjectIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/95 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div className="pr-10">
                  <span className="bg-[#003366] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase">Projet {selectedProjectIdx + 1} / 20</span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#003366] uppercase italic mt-4">{chemtechProjects[selectedProjectIdx].title}</h2>
                  <p className="text-[#10B981] font-bold text-xs uppercase tracking-widest mt-1">{chemtechProjects[selectedProjectIdx].client}</p>
                </div>
                <button onClick={() => setSelectedProjectIdx(null)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="space-y-6">
                {/* BLOC CONTEXTE OPÉRATIONNEL (RESTAU RÉ) */}
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                  <p className="text-[10px] font-black text-[#10B981] uppercase mb-2 flex items-center gap-2">
                    <Target size={12}/> Contexte Opérationnel
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                    {generateProjectSummary(chemtechProjects[selectedProjectIdx])}
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border-l-8 border-[#10B981]">
                  <p className="text-base font-medium italic text-slate-700 leading-relaxed">
                    "{chemtechProjects[selectedProjectIdx].details}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t pt-6">
                  <div>
                    <p className="text-[9px] font-black text-[#10B981] uppercase">Rôle</p>
                    <p className="font-bold text-[#003366] text-sm italic">{chemtechProjects[selectedProjectIdx].role}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#10B981] uppercase">Outils</p>
                    <p className="font-bold text-[#003366] text-sm italic">{chemtechProjects[selectedProjectIdx].tools}</p>
                  </div>
                </div>
              </div>

              {/* NAVIGATION INTERNE MODAL */}
              <div className="flex gap-3 mt-8">
                <button onClick={() => setSelectedProjectIdx(prev => (prev - 1 + 20) % 20)} className="flex-1 bg-slate-100 py-3 rounded-xl font-black text-xs text-[#003366] flex items-center justify-center gap-2 hover:bg-[#10B981] hover:text-white transition-all">
                  <ChevronLeft size={16}/> PRÉCÉDENT
                </button>
                <button onClick={() => setSelectedProjectIdx(prev => (prev + 1) % 20)} className="flex-1 bg-slate-100 py-3 rounded-xl font-black text-xs text-[#003366] flex items-center justify-center gap-2 hover:bg-[#10B981] hover:text-white transition-all">
                  SUIVANT <ChevronRight size={16}/>
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
