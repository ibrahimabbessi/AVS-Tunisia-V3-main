import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <main className="flex-grow pt-[100px]">

          {/* Section 1: Hero Section - IFT Global */}
          <section className="relative max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-md md:py-section-gap-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#ade8f4] text-[#03045e] rounded-full font-label-md text-label-md uppercase mb-6">
                  <span className="material-symbols-outlined text-sm">stars</span>
                  IFT Global
                </span>
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
                  Service IFT Global pour la formation professionnelle et l'employabilité en Allemagne
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-lg">
                  Le centre d'emploi à l'étranger en Allemagne est une institution de recrutement professionnelle qui offre des services de conseil et de placement pour les demandeurs d'emploi et les employeurs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#03045e] text-white font-label-md text-label-md px-8 py-3.5 rounded-lg hover:scale-[1.02] transition-transform duration-300 glass-edge flex items-center justify-center gap-2">
                    En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <button className="border-[1.5px] border-[#0096c7] text-[#0096c7] font-label-md text-label-md px-8 py-3.5 rounded-lg hover:bg-[#0096c7]/5 transition-colors duration-300 flex items-center justify-center gap-2">
                    Contactez-nous
                  </button>
                </div>
              </div>
              <div className="relative z-10 hidden md:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-panel ambient-shadow">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Centre d'emploi à l'étranger en Allemagne" 
                    src="https://res.cloudinary.com/girgi5fd/image/upload/v1788249113/bg208.png"
                  />
                  <div className="absolute top-8 -left-6 bg-white rounded-xl p-4 shadow-lg flex items-center gap-4 animate-[bounce_4s_infinite]">
                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                      <span className="material-symbols-outlined">handshake</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-primary">Recrutement</p>
                      <p className="font-caption text-caption text-on-surface-variant">Conseil & Placement</p>
                    </div>
                  </div>
                  <div className="absolute bottom-8 -right-6 bg-white rounded-xl p-4 shadow-lg flex items-center gap-4 animate-[bounce_5s_infinite_reverse]">
                    <div className="w-12 h-12 rounded-full bg-[#e0e0ff] flex items-center justify-center text-[#393e8c]">
                      <span className="material-symbols-outlined">task_alt</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-primary">Assistance</p>
                      <p className="font-caption text-caption text-on-surface-variant">Visa & Hébergement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary-fixed-dim/20 to-transparent rounded-full blur-3xl -z-10 -translate-y-1/4 translate-x-1/4"></div>
          </section>

          {/* Section 2 & 3: Raisons et Avantages */}
          <section className="bg-surface-container-lowest py-section-gap-md md:py-section-gap-lg">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
              <div className="text-center mb-16">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Les raisons et les avantages d'une formation ou d'un emploi en Allemagne</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                  Découvrez pourquoi l'Allemagne est la destination idéale pour votre carrière professionnelle.
                </p>
              </div>

              {/* Reasons */}
              <div className="mb-16">
                <h3 className="font-headline-md text-headline-md text-primary mb-6 text-center">Raisons</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                  {/* Text Content */}
                  <div className="bg-white rounded-2xl p-8 border border-outline-variant/30 ambient-shadow flex-1">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Actuellement, il existe plusieurs postes vacants en Allemagne dans les domaines des soins infirmiers, d'industrie, d'hôtellerie, de la gastronomie ou encore la peinture, la menuiserie ou le bâtiment… étant donné que les stagiaires et les ouvriers allemands ne sont pas nombreux, les sociétés cherchent à recruter des jeunes étrangers.
                    </p>
                  </div>
                  
                  {/* Image - Half size */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 hover:scale-[1.02] transition-transform duration-500 w-1/3 md:w-1/4 flex-shrink-0">
                    <img
                      src="https://thumbs.dreamstime.com/b/le-deutschland-allemagne-art-map-79914986.jpg"
                      alt="Carte artistique de l'Allemagne"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03045e]/20 to-transparent"></div>
                  </div>
                </div>
              </div>              


              {/* Advantages Grid with Images */}
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-8 text-center">Avantages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Formation Professionnelle */}
                  <div className="bg-white rounded-2xl border border-outline-variant/30 hover:border-[#0096c7] transition-all duration-300 group ambient-shadow hover:-translate-y-1 overflow-hidden">
                    <div className="relative w-full h-48 bg-gradient-to-br from-[#03045e]/10 to-[#0096c7]/10">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2gNDnqc0obiEwbMhwmCSvO8qkUQ1hsOgPnRs_s_kMxfThcJ5MYp00XnYE&s=10"
                        alt="Formation professionnelle en Allemagne"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-[#e0e0ff] transition-colors -mt-12 relative z-10 border-4 border-white">
                        <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-3">Formation Professionnelle</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-[#0096c7] mt-1">✓</span>
                          <p className="font-body-md text-body-md text-on-surface-variant">Durée de la formation : 2 à 3 ans, diplôme attribué à la fin</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#0096c7] mt-1">✓</span>
                          <p className="font-body-md text-body-md text-on-surface-variant">Rémunération (bourse de formation) permettant de payer le loyer assuré par la société</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#0096c7] mt-1">✓</span>
                          <p className="font-body-md text-body-md text-on-surface-variant">Études ou stage : 5 jours par semaine (40 heures)</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#0096c7] mt-1">✓</span>
                          <p className="font-body-md text-body-md text-on-surface-variant">Congé annuel payé de 4 semaines</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Emploi */}
                  <div className="bg-white rounded-2xl border border-outline-variant/30 hover:border-[#0096c7] transition-all duration-300 group ambient-shadow hover:-translate-y-1 overflow-hidden">
                    <div className="relative w-full h-48 bg-gradient-to-br from-[#03045e]/10 to-[#0096c7]/10">
                      <img
                        src="https://res.cloudinary.com/girgi5fd/image/upload/v1788210004/bg206.jpg"
                        alt="Emploi en Allemagne"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-[#e0e0ff] transition-colors -mt-12 relative z-10 border-4 border-white">
                        <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-3">Emploi</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-[#0096c7] mt-1">✓</span>
                          <p className="font-body-md text-body-md text-on-surface-variant">Économie puissante et diversifiée avec un marché du travail stable</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#0096c7] mt-1">✓</span>
                          <p className="font-body-md text-body-md text-on-surface-variant">Salaire compétitif avec rémunérations élevées pour les travailleurs qualifiés</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#0096c7] mt-1">✓</span>
                          <p className="font-body-md text-body-md text-on-surface-variant">Infrastructure moderne (transports, communication, technologie)</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Perspectives */}
          <section className="py-section-gap-md md:py-section-gap-lg relative">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
              <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="w-full md:w-1/2">
                  <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Perspectives</h2>
                  <div className="space-y-4">
                    {/* Card 1 */}
                    <div className="group bg-white rounded-2xl p-6 border border-outline-variant/30 ambient-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0096c7] cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#ade8f4]/30 flex items-center justify-center text-[#03045e] text-sm font-bold group-hover:bg-[#0096c7] group-hover:text-white transition-all duration-300 flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-[#03045e] transition-colors duration-300">
                          Dans le cas où un contrat de travail et de loyer sont assurés après la formation, le stagiaire pourra obtenir un <span className="font-semibold text-[#0096c7] group-hover:text-[#03045e] transition-colors duration-300">permis de résidence permanente</span> en Allemagne.
                        </p>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group bg-white rounded-2xl p-6 border border-outline-variant/30 ambient-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0096c7] cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#ade8f4]/30 flex items-center justify-center text-[#03045e] text-sm font-bold group-hover:bg-[#0096c7] group-hover:text-white transition-all duration-300 flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-[#03045e] transition-colors duration-300">
                          Généralement la <span className="font-semibold text-[#0096c7] group-hover:text-[#03045e] transition-colors duration-300">majorité des sociétés</span> font en sorte de garder leurs stagiaires et leurs ouvriers.
                        </p>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group bg-white rounded-2xl p-6 border border-outline-variant/30 ambient-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0096c7] cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#ade8f4]/30 flex items-center justify-center text-[#03045e] text-sm font-bold group-hover:bg-[#0096c7] group-hover:text-white transition-all duration-300 flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-[#03045e] transition-colors duration-300">
                          L'Allemagne est réputée pour sa <span className="font-semibold text-[#0096c7] group-hover:text-[#03045e] transition-colors duration-300">main-d'œuvre hautement qualifiée</span> et ses standards élevés en matière d'éducation et de formation professionnelle.
                        </p>
                      </div>
                    </div>

                    {/* Card 4 */}
                    <div className="group bg-white rounded-2xl p-6 border border-outline-variant/30 ambient-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0096c7] cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#ade8f4]/30 flex items-center justify-center text-[#03045e] text-sm font-bold group-hover:bg-[#0096c7] group-hover:text-white transition-all duration-300 flex-shrink-0 mt-0.5">
                          4
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-[#03045e] transition-colors duration-300">
                          Les salaires en Allemagne sont généralement <span className="font-semibold text-[#0096c7] group-hover:text-[#03045e] transition-colors duration-300">compétitifs</span> et le pays offre un <span className="font-semibold text-[#0096c7] group-hover:text-[#03045e] transition-colors duration-300">niveau de vie élevé</span>.
                        </p>
                      </div>
                    </div>

                    {/* Card 5 */}
                    <div className="group bg-white rounded-2xl p-6 border border-outline-variant/30 ambient-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0096c7] cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#ade8f4]/30 flex items-center justify-center text-[#03045e] text-sm font-bold group-hover:bg-[#0096c7] group-hover:text-white transition-all duration-300 flex-shrink-0 mt-0.5">
                          5
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-[#03045e] transition-colors duration-300">
                          Les entreprises allemandes valorisent généralement le <span className="font-semibold text-[#0096c7] group-hover:text-[#03045e] transition-colors duration-300">développement professionnel</span> de leurs employés, offrant des opportunités d'avancement et d'évolution de carrière.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 hidden md:block">
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden glass-panel ambient-shadow p-4">
                    <div 
                      className="bg-cover bg-center w-full h-full rounded-2xl" 
                      style={{
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBToFYLt-EZM2ZHUeiltdhZscJGDzZ-9wn0XEIrkbGbb0lnKkCKbKuZdfGhpW7_OvlNvFdtwT0q-iXjSGqS8qLqWVWXhY2BxdyE2L6HC40ObVvjCCutv3xH5l98_2MOPd3P2owTYTuMFYPnVzcQqJQm6W3OVa7svpXwu3_xA13Rk0O-uz2MZvzEPSRdYbweVH4c4urUMaxdRxyvNLaUDmzGcXFOqovVd5UDiu2QqdErjzruL4w33IzfgA')",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nos Services Section with Images */}
          <section className="bg-surface-container-lowest py-section-gap-md md:py-section-gap-lg">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
              <div className="text-center mb-16">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Nos Services</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                  Une équipe experte de recruteurs engagée à offrir des solutions de recrutement efficaces et personnalisées.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Base de données */}
                <div className="bg-white rounded-2xl border border-outline-variant/30 hover:border-[#0096c7] transition-all duration-300 group ambient-shadow hover:-translate-y-1 overflow-hidden">
                  <div className="relative w-full h-40 bg-gradient-to-br from-[#03045e]/10 to-[#0096c7]/10">
                    <img
                      src="https://digital-staffing.fr/wp-content/uploads/2019/04/DSF-5-tendances-recrutement-en-2019.png"
                      alt="Base de données de candidats"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-[#e0e0ff] transition-colors -mt-8 relative z-10 border-4 border-white">
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2 text-lg">Base de données</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm">Candidats qualifiés et expérimentés dans divers secteurs d'activité.</p>
                  </div>
                </div>

                {/* Assistance Visa */}
                <div className="bg-white rounded-2xl border border-outline-variant/30 hover:border-[#0096c7] transition-all duration-300 group ambient-shadow hover:-translate-y-1 overflow-hidden">
                  <div className="relative w-full h-40 bg-gradient-to-br from-[#03045e]/10 to-[#0096c7]/10">
                    <img
                      src="https://static.wixstatic.com/media/193d2c_a22dc120727042a3944e798147893d79~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_90/visa-germany-d-visa.jpg"
                      alt="Assistance Visa pour l'Allemagne"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-[#e0e0ff] transition-colors -mt-8 relative z-10 border-4 border-white">
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2 text-lg">Assistance Visa</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm">Procédures de visa, arrangements de voyage et d'hébergement.</p>
                  </div>
                </div>

                {/* Formation */}
                <div className="bg-white rounded-2xl border border-outline-variant/30 hover:border-[#0096c7] transition-all duration-300 group ambient-shadow hover:-translate-y-1 overflow-hidden">
                  <div className="relative w-full h-40 bg-gradient-to-br from-[#03045e]/10 to-[#0096c7]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-[#03045e]/20 absolute">school</span>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyw5_yf0JCr88XH9Z1-NM6HZm-1KP6msua-ot2-CWQisK0CdEr-RRjfXS_&s=10"
                      alt="Formation professionnelle"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-[#e0e0ff] transition-colors -mt-8 relative z-10 border-4 border-white">
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2 text-lg">Formation</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm">Formation professionnelle pour améliorer les compétences des travailleurs.</p>
                  </div>
                </div>

                {/* Méthodes innovantes */}
                <div className="bg-white rounded-2xl border border-outline-variant/30 hover:border-[#0096c7] transition-all duration-300 group ambient-shadow hover:-translate-y-1 overflow-hidden">
                  <div className="relative w-full h-40 bg-gradient-to-br from-[#03045e]/10 to-[#0096c7]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-[#03045e]/20 absolute">trending_up</span>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgKOo05uzLfIV86GhwZSgnkre_A5cr0QSR4OkrCnlBatyeouJIRbz1Ss&s=10"
                      alt="Méthodes innovantes de recrutement"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-[#e0e0ff] transition-colors -mt-8 relative z-10 border-4 border-white">
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2 text-lg">Méthodes innovantes</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm">Recrutement innovant pour trouver les meilleurs talents.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
      <Footer />
    </>
  );
}