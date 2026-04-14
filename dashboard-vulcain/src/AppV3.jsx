import React, { useState, useEffect } from 'react';
import { 
  Settings, ShieldCheck, PenTool, Globe, ChevronRight, ChevronLeft, 
  Briefcase, X, Calendar, CheckCircle, TrendingUp, Target, Database,
  Search, Clock, Award, Zap, Star, BarChart3, Activity
} from 'lucide-react';

const DashboardVulcain = () => {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { id: "MJR-13169", client: "MJR", title: "MTOURE COMPERJ", period: "2013", role: "Stagiaire Support", tools: "Excel, PDMS", details: "Gestion des listes de matériels et extraction de données 3D.", skills: ["MTO"] },
    { id: "PBR-12045", client: "PETROBRAS", title: "Unité de Traitement Gaz Naturel", period: "2014", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Support à l'ingénierie de détail pour tuyauterie auxiliaire.", skills: ["Gaz Naturel"] },
    { id: "VAL-14002", client: "VALE", title: "Audit Infrastructures São Luis", period: "2014", role: "Stagiaire Support", tools: "Normes NR", details: "Vérification sur site de la conformité maquette vs réel.", skills: ["Audit Site"] }

  ];

  // Statistiques calculées pour le Dashboard
  const stats = [
    { label: "Missions Petrobras", value: "8", icon: <Activity className="text-blue-600" />, color: "bg-blue-50" },
    { label: "Projets Vale/Mining", value: "6", icon: <Database className="text-green-600" />, color: "bg-green-50" },
    { label: "Modélisation 3D", value: "100%", icon: <Zap className="text-yellow-600" />, color: "bg-yellow-50" },
    { label: "Non-conformités HSE", value: "0", icon: <ShieldCheck className="text-emerald-600" />, color: "bg-emerald-50" }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 pb-12">
      {/* Barre de progression */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-50">
        <div className="h-full bg-gradient-to-r from-[#003366] to-[#10B981] transition-all" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Header - Identité Visuelle Vulcain Engineering */}
      <nav className="bg-[#003366] text-white p-6 md:p-10 shadow-2xl sticky top-0 z-40 border-b-4 border-[#10B981]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">Eliandro Teles</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <span className="h-2 w-2 bg-green-400 rounded-full animate-ping"></span>
              <p className="text-blue-200 font-bold text-xs md:text-lg uppercase tracking-widest">Expert Support Ingénierie • Chemtech / Siemens</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block bg-white/10 p-3 rounded-xl border border-white/10">
              <p className="text-[10px] text-blue-200 font-black uppercase">Statut Candidat</p>
              <p className="text-sm font-bold">Vulcain Engineering Group</p>
            </div>
            <div className="bg-[#10B981] text-white px-6 py-3 rounded-full font-black italic shadow-lg animate-pulse flex items-center gap-2">
              <Zap size={18} /> DISPONIBLE
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* SECTION 1: LE DASHBOARD DE PERFORMANCE (Remplaçant MD Concept) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="text-3xl md:text-5xl font-black text-[#003366] tracking-tighter">{stat.value}</div>
              <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* SECTION 2: FOCUS CHEMTECH - VISUEL INDUSTRIEL */}
        <section className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Colonne Gauche: Résumé & Radar */}
            <div className="lg:col-span-5 p-8 lg:p-12 bg-slate-50 border-r border-slate-100">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-[#003366] rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Star size={14} className="fill-[#003366]"/> Expérience Pilier
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#003366] leading-none mb-6 italic uppercase">
                Chemtech <br/>
                <span className="text-[#10B981]">Siemens</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium italic leading-relaxed mb-8">
                "Deux ans d'immersion totale au sein d'une filiale Siemens, assurant le support technique sur des projets Oil & Gas complexes. Maîtrise rigoureuse des processus industriels et des environnements multidisciplinaires."
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="text-blue-600" size={20}/>
                    <span className="font-bold text-sm uppercase">Projets délivrés</span>
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black text-sm">17</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-600" size={20}/>
                    <span className="font-bold text-sm uppercase">Conformité HSE</span>
                  </div>
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-black text-sm">100%</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite: Matrice des Projets */}
            <div className="lg:col-span-7 p-6 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Project Console</h3>
                <div className="h-1 flex-1 mx-4 bg-slate-100 rounded-full"></div>
                <Search size={18} className="text-slate-300"/>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {chemtechProjects.map((project, idx) => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProjectIdx(idx)}
                    className="group bg-slate-50 hover:bg-[#003366] p-5 rounded-3xl border border-slate-200 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:text-white">
                      <Settings size={40} className="animate-spin-slow" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[9px] font-black px-2 py-1 bg-white group-hover:bg-[#10B981] group-hover:text-white rounded-md text-[#003366] uppercase transition-colors">
                          {project.client}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 group-hover:text-blue-200">{project.period}</span>
                      </div>
                      <h4 className="font-black text-[#003366] group-hover:text-white text-sm uppercase italic leading-tight mb-4">
                        {project.title}
                      </h4>
                      <div className="flex gap-2">
                        {project.skills.slice(0, 2).map(s => (
                          <span key={s} className="text-[8px] font-bold text-slate-500 group-hover:text-white/70 border border-slate-200 group-hover:border-white/20 px-2 py-1 rounded-full uppercase">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TECH STACK (Optimisée en Cockpit) */}
        <section className="bg-[#003366] p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 p-12 opacity-5">
            <Database size={200} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Technical Stack</h3>
              <p className="text-blue-200 font-medium italic">
                L'ensemble des outils maîtrisés et déployés sur les infrastructures critiques Petrobras et Vale.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {["PDMS", "AutoCAD", "SolidWorks", "NX", "VESTA", "MS Project"].map(tool => (
                <div key={tool} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-white/20 transition-all group">
                  <PenTool size={20} className="mb-2 text-[#10B981] group-hover:scale-110 transition-transform"/>
                  <span className="font-black text-xs uppercase tracking-widest">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Flottant & Footer identiques au précédent pour la consistance */}
        <div className="fixed bottom-6 right-6 z-40">
           <a href="/Dossier Technique - Eliandro Teles.pdf" download className="block">
            <button className="bg-gradient-to-r from-[#10B981] to-blue-600 text-white px-6 py-4 rounded-full font-black text-sm md:text-base shadow-2xl flex items-center gap-3 hover:scale-105 transition-all animate-bounce">
              <Zap size={20}/> 📄 DOSSIER TECHNIQUE
            </button>
          </a>
        </div>
      </main>

      {/* MODAL (Identique, pour garder la navigation entre les 17 projets) */}
      {selectedProjectIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001529]/95 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative max-h-[90vh] overflow-y-auto">
             {/* ... contenu de la modal identique à ton code actuel ... */}
             <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <span className="bg-[#003366] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">PROJET {selectedProjectIdx + 1} / 17</span>
                      <h2 className="text-3xl md:text-4xl font-black text-[#003366] uppercase italic mt-4">{chemtechProjects[selectedProjectIdx].title}</h2>
                   </div>
                   <button onClick={() => setSelectedProjectIdx(null)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <X size={32} />
                   </button>
                </div>
                <div className="space-y-6">
                   <div className="bg-slate-50 p-6 rounded-3xl border-l-8 border-[#10B981]">
                      <p className="text-lg font-medium italic text-slate-700 leading-relaxed">"{chemtechProjects[selectedProjectIdx].details}"</p>
                   </div>
                   <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                      <div>
                         <p className="text-[10px] font-black text-[#10B981] uppercase tracking-widest">Rôle</p>
                         <p className="font-bold text-[#003366] text-lg italic">{chemtechProjects[selectedProjectIdx].role}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-[#10B981] uppercase tracking-widest">Stack</p>
                         <p className="font-bold text-[#003366] text-lg italic">{chemtechProjects[selectedProjectIdx].tools}</p>
                      </div>
                   </div>
                </div>
                <div className="flex gap-4 mt-10">
                   <button onClick={() => setSelectedProjectIdx(prev => (prev - 1 + chemtechProjects.length) % chemtechProjects.length)} className="flex-1 bg-slate-100 py-4 rounded-2xl font-black text-[#003366] flex items-center justify-center gap-2 hover:bg-[#10B981] hover:text-white transition-all"><ChevronLeft/> PRÉCÉDENT</button>
                   <button onClick={() => setSelectedProjectIdx(prev => (prev + 1) % chemtechProjects.length)} className="flex-1 bg-slate-100 py-4 rounded-2xl font-black text-[#003366] flex items-center justify-center gap-2 hover:bg-[#10B981] hover:text-white transition-all">SUIVANT <ChevronRight/></button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardVulcain;
