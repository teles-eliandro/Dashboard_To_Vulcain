import React, { useState, useMemo } from 'react';
import * as Lucide from 'lucide-react';

const generateProjectSummary = (project) => {
  const summaries = {
    "PETROBRAS": "Optimisation d'infrastructures critiques pour la production d'énergie et le raffinage, nécessitant une précision absolue en modélisation 3D.",
    "VALE": "Amélioration de la sécurité opérationnelle et de l'efficacité logistique sur des sites miniers de grande envergure.",
    "CSN": "Accompagnement de l'expansion de capacités sidérurgiques via la réorganisation mécanique.",
    "default": "Support technique multidisciplinaire visant à garantir l'excellence opérationnelle sur des projets complexes."
  };
  return summaries[project.client] || summaries.default;
};

const DashboardVulcain = () => {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Raccourcis sécurisés pour les icônes
  const Icon = ({ name, ...props }) => {
    const LucideIcon = Lucide[name] || Lucide.HelpCircle || Lucide.AlertCircle;
    return <LucideIcon {...props} />;
  };

  const chemtechProjects = [
    { id: "PBR-09410", client: "PETROBRAS", title: "Centrale Thermique UTE SEPE TIARAJU", period: "2012 - 2014", role: "Stagiaire Support d'Ingénierie", tools: "PDMS, AutoCAD", details: "Modélisation complète (Civil, Équipements, Tuyauterie). Extraction et révision d'isométriques.", skills: ["Modélisation 3D", "Piping"] },
    { id: "FWR-10397", client: "FEED PREMIUM ONSITE", title: "Support Technique Ingénierie", period: "2012", role: "Stagiaire Support", tools: "PDMS, Isométriques", details: "Adéquation, extraction, révision et exécution d'isométriques.", skills: ["Piping"] },
    { id: "PBR-10330", client: "PETROBRAS", title: "EBDMOTOB & EDAdeqLogist", period: "2012 - 2013", role: "Stagiaire Support", tools: "AutoCAD, PDMS", details: "Adéquation technique, révision d'isométriques pour la logistique.", skills: ["Logistique"] },
    { id: "VAL-11622", client: "VALE", title: "ABASLOCO", period: "2013", role: "Stagiaire Support", tools: "AutoCAD (DWG)", details: "Exécution et correction de plans techniques et de fichiers DWG.", skills: ["AutoCAD"] },
    { id: "PBR-10056", client: "PETROBRAS", title: "Revamp U-280 PD", period: "2012", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Support à la modélisation pour le projet de Revamping.", skills: ["Revamping"] },
    { id: "PTC-12001", client: "PTC", title: "EBD Coger", period: "2012", role: "Stagiaire Support", tools: "PDMS, Isométriques", details: "Travaux d'adéquation et exécution de documents de flexibilité.", skills: ["Piping"] },
    { id: "UNE-11651", client: "UNE", title: "UTCS UTGC", period: "2012 - 2013", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Révision et exécution d'isométriques et de documents de flexibilité.", skills: ["Tuyauterie"] },
    { id: "PBR-11693", client: "PETROBRAS", title: "PDMS COMOS", period: "2013", role: "Stagiaire Support", tools: "PDMS, COMOS", details: "Levé de terrain virtuel et intégration de données techniques.", skills: ["Data"] },
    { id: "VAL-11601", client: "VALE", title: "Analyse HSE São Luis", period: "2012 - 2014", role: "Stagiaire Support", tools: "Normes NR, MS Office", details: "Élaboration de formulaires d'évaluation des risques HSE.", skills: ["HSE", "Audit"] },
    { id: "VAL-12549", client: "VALE", title: "Nouveau Poste de Maintenance", period: "2013", role: "Stagiaire Support", tools: "AutoCAD, Excel", details: "Recherche et remplissage de listes de matériels (BOM).", skills: ["BOM"] },
    { id: "CON-12584", client: "CON", title: "ADEXERNS - Modélisation Supports", period: "2013", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Modélisation de supports pour lignes fines et équipements.", skills: ["Supports"] },
    { id: "BSK-09274", client: "VAL-UO1-PD", title: "Fontes GM - Support Tuyauterie", period: "2013", role: "Stagiaire Support", tools: "PDMS, Isométriques", details: "Traitement et adéquation d'isométriques.", skills: ["Tuyauterie"] },
    { id: "BSF-13157", client: "BSF", title: "F265 J200 - Locação Equipamentos", period: "2014", role: "Stagiaire Support", tools: "PDMS, AutoCAD", details: "Modélisation et positionnement d'équipements industriels.", skills: ["3D Modeling"] },
    { id: "CSN-13139", client: "CSN", title: "Expansion Phase 2 - Sidérurgie", period: "2014", role: "Stagiaire Support", tools: "AutoCAD (DWG)", details: "Arrangements mécaniques et repositionnement d'équipements lourds.", skills: ["Mécanique"] },
    { id: "VAL-13546", client: "VALE", title: "Système de Pompage Booster CMC", period: "2014", role: "Stagiaire Support", tools: "PDMS, MS Office", details: "Adéquation de routes de tuyauterie et supports spéciaux.", skills: ["Piping"] },
    { id: "VAL-13490", client: "VALE", title: "Dépoussiérage MAPU 230", period: "2014", role: "Stagiaire Support", tools: "AutoCAD (DWG)", details: "Mise en œuvre de dessins DWG et arrangements mécaniques.", skills: ["Mécanique"] },
    { id: "LXS-11424", client: "LXS", title: "Dessins Mécaniques & Isométriques", period: "2014", role: "Stagiaire Support", tools: "AutoCAD, Isométriques", details: "Élaboration et adéquation de dessins mécaniques.", skills: ["Mécanique"] },
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

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      <nav className="bg-[#003366] text-white p-6 shadow-xl sticky top-0 z-40 border-b-4 border-[#10B981]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black uppercase italic tracking-tighter">Eliandro Teles</h1>
            <p className="text-blue-200 text-[9px] font-bold uppercase tracking-widest">Support Ingénierie • Chemtech Siemens</p>
          </div>
          <div className="flex gap-2">
             <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-blue-600 transition-colors"><Icon name="Linkedin" size={18} /></a>
             <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-slate-800 transition-colors"><Icon name="Github" size={18} /></a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <section className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Icon name="Settings" size={14} className="animate-spin" /> Project Console
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
                <Icon name="Search" size={18} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto">
            {filteredProjects.map((project) => (
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
              <Icon name="X" size={24} />
            </button>
            
            <div className="p-8">
              <span className="text-[9px] font-black text-[#10B981] uppercase tracking-[0.2em]">Détails Mission</span>
              <h2 className="text-xl font-black text-[#003366] uppercase italic mt-2 leading-tight">
                {chemtechProjects[selectedProjectIdx].title}
              </h2>

              <div className="mt-6 space-y-4">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-1 flex items-center gap-1">
                    <Icon name="Target" size={12}/> Contexte Opérationnel
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
              </div>

              <div className="flex gap-2 mt-8">
                <button 
                  onClick={() => setSelectedProjectIdx(prev => (prev - 1 + 20) % 20)}
                  className="flex-1 bg-slate-100 py-3 rounded-xl text-[10px] font-black hover:bg-slate-200 transition-all"
                >
                  PRÉCÉDENT
                </button>
                <button 
                  onClick={() => setSelectedProjectIdx(prev => (prev + 1) % 20)}
                  className="flex-1 bg-slate-100 py-3 rounded-xl text-[10px] font-black hover:bg-slate-200 transition-all"
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
