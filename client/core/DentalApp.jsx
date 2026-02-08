import React, { useEffect, useState } from "react";

const initialPatients = [
  { id: "01", name: "Boubacar Kande", dateOfBirth: "2005-05-15", lastVisit: "2025-12-11", procedure: "Prophylaxis (Cleaning)", phone: "647-001-3456" },
  { id: "02", name: "Ritesh Kadian", dateOfBirth: "2005-10-04", lastVisit: "2025-11-10", procedure: "Comprehensive Oral Exam", phone: "647-002-7890" },
  { id: "03", name: "Van Thanh Nguyen", dateOfBirth: "2005-09-01", lastVisit: "2025-10-12", procedure: "Restorative Filling", phone: "647-003-1234" },
  { id: "04", name: "Basil Peter Kunnath", dateOfBirth: "2005-12-05", lastVisit: "2025-12-09", procedure: "Endodontic Therapy", phone: "647-004-5678" },
  { id: "05", name: "Mohamad Ayan Saiyed", dateOfBirth: "2005-07-22", lastVisit: "2025-09-10", procedure: "Invisalign Treatment Review", phone: "647-005-9012" },
];

function formatDateISO(dateStr) {
  try {
    return new Date(dateStr).toISOString().slice(0, 10);
  } catch (e) {
    return dateStr;
  }
}

const DentalApp = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [form, setForm] = useState({ name: "", dateOfBirth: "", lastVisit: "", procedure: "", phone: "" });
  const [deleteModal, setDeleteModal] = useState({ visible: false, id: null, name: "" });
  const [toast, setToast] = useState({ message: "", classes: "", visible: false });

  useEffect(() => {
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    closeModal();
  };

  const editPatient = (patientId = null) => {
    setEditingPatientId(patientId);
    if (patientId) {
      const p = patients.find((x) => x.id === patientId);
      if (p) {
        setForm({ name: p.name, dateOfBirth: formatDateISO(p.dateOfBirth), lastVisit: formatDateISO(p.lastVisit), procedure: p.procedure, phone: p.phone });
      }
    } else {
      setForm({ name: "", dateOfBirth: "", lastVisit: "", procedure: "", phone: "" });
    }
    scrollToSection("form-section");
  };

  const showToast = (message, classes = "bg-accent-gold text-primary-dark") => {
    setToast({ message, classes, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, dateOfBirth, lastVisit, procedure, phone } = form;
    if (!name || !dateOfBirth || !lastVisit || !procedure || !phone) {
      showToast("Validation Error: All fields are required!", "bg-red-500");
      return;
    }

    if (editingPatientId) {
      setPatients((prev) => prev.map((p) => (p.id === editingPatientId ? { ...p, name, dateOfBirth, lastVisit, procedure, phone } : p)));
      showToast("Record Updated: Patient record updated successfully!", "bg-accent-gold text-primary-dark");
    } else {
      const maxId = patients.reduce((max, p) => Math.max(max, parseInt(p.id, 10)), 0);
      const newId = (maxId + 1).toString().padStart(2, "0");
      const newPatient = { id: newId, name, dateOfBirth, lastVisit, procedure, phone };
      setPatients((prev) => [...prev, newPatient]);
      showToast("Record Created: New patient record created successfully!", "bg-accent-gold text-primary-dark");
    }

    setEditingPatientId(null);
    setTimeout(() => {
      scrollToSection("patients-section");
    }, 200);
  };

  const showDeleteModal = (id, name) => setDeleteModal({ visible: true, id, name });

  const closeModal = () => setDeleteModal({ visible: false, id: null, name: "" });

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    closeModal();
    showToast("Record Deleted: Patient record deleted!", "bg-red-500");
  };

  const totalPatients = patients.length;
  const latestVisit = patients.reduce((latest, p) => (new Date(p.lastVisit) > new Date(latest) ? p.lastVisit : latest), "1900-01-01");
  const latestVisitFormatted = latestVisit === "1900-01-01" ? "N/A" : new Date(latestVisit).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div>
      <header className="bg-primary-dark text-primary-light shadow-medium fixed top-0 left-0 w-full z-30 py-5">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold flex items-center tracking-wide">Aura Dental</h1>
          <nav className="flex space-x-8 text-lg">
            <button onClick={() => scrollToSection("hero-section")} className="text-primary-light hover:text-accent-gold">Home</button>
            <button onClick={() => scrollToSection("essence-section")} className="text-primary-light hover:text-accent-gold">Our Essence</button>
            <button onClick={() => scrollToSection("dashboard-section")} className="text-primary-light hover:text-accent-gold">Dashboard</button>
            <button onClick={() => scrollToSection("patients-section")} className="text-primary-light hover:text-accent-gold">Patients</button>
            <button onClick={() => editPatient()} className="px-5 py-2 bg-accent-gold text-primary-dark rounded-full font-bold">Book Now</button>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        <section id="hero-section" className="text-primary-light pt-6">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h1 className="text-6xl sm:text-8xl font-bold leading-tight mb-8">Experience A New Era of Luxury Dentistry</h1>
            <p className="text-2xl sm:text-3xl font-light mb-12 opacity-95">Redefining your smile with unparalleled care in Downtown Toronto.</p>
            <button onClick={() => scrollToSection("essence-section")} className="px-10 py-5 bg-accent-gold text-primary-dark text-xl font-bold rounded-full">Discover Aura Dental</button>
          </div>
        </section>

        <section id="essence-section" className="py-24">
          <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-dark mb-6">A New Era of Luxury Dentistry</h2>
              <p className="text-text-secondary leading-relaxed mb-6">At Aura Dental, we are a dedicated studio that offers patients exceptional experiences by blending the best digital dental technology with hospitality-oriented service and beautiful ambiance.</p>
            </div>
            <div className="flex justify-center items-center">
              <img src="/public/toothimage.png" alt="Luxury Dental Tools" className="w-full max-w-2xl h-auto rounded-lg shadow-deep border border-gray-100 object-cover" />
            </div>
          </div>
        </section>

        <section id="dashboard-section" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl font-bold text-primary-dark mb-10 text-center">
              Your Practice at a Glance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div
                className="bg-card-bg p-8 rounded-xl shadow-medium border-t-4 border-accent-gold transition duration-300 hover:shadow-xl hover:scale-[1.01]">
                <p className="text-sm font-semibold text-text-secondary mb-2">Total Active Records</p>
                <p className="text-5xl font-extrabold text-primary-dark mt-1" id="total-patients-count">{totalPatients}</p>
              </div>
              <div
                className="bg-card-bg p-8 rounded-xl shadow-medium border-t-4 border-accent-gold transition duration-300 hover:shadow-xl hover:scale-[1.01]">
                <p className="text-sm font-semibold text-text-secondary mb-2">Latest Patient Visit</p>
                <p className="text-5xl font-extrabold text-primary-dark mt-1" id="latest-visit-date">{latestVisitFormatted}</p>
              </div>
              <div
                className="bg-primary-dark text-primary-light p-8 rounded-xl shadow-medium border-t-4 border-accent-gold transition duration-300 hover:shadow-xl hover:scale-[1.01]">
                <p className="text-sm font-semibold text-gray-300 mb-2">Efficient Workflow</p>
                <button onClick={() => editPatient()}
                  className="mt-3 w-full py-3 bg-accent-gold text-primary-dark rounded-lg font-bold hover:bg-white transition duration-300">
                  + New Patient Intake
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-medium border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6 border-b pb-3">
                <h3 className="text-xl font-bold text-primary-dark flex items-center">
                  <svg className="w-6 h-6 mr-2 text-accent-gold" fill="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  Customer Ratings & Reviews
                </h3>
                <div className="flex flex-col items-end">
                  <div className="text-4xl font-extrabold text-primary-dark">4.9</div>
                  <div className="text-2xl text-accent-gold leading-none">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <p className="text-xs text-text-secondary mt-1">Based on 29 reviews</p>
                </div>
              </div>

              <div id="review-slider" className="h-96 overflow-y-scroll space-y-6 pr-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="/avatar/cat.png" className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                      alt="User Avatar" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Ritesh Kadian</p>
                        <div className="text-sm text-accent-gold leading-none">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>
                  </div>
                  <p className="text-text-primary leading-relaxed text-sm mb-2">Since my treatment at Aura Dental, I don't just smile—I literally glow. My actual aura is now 30% brighter and smells faintly of spearmint.</p>
                  <div className="text-xs text-text-secondary flex items-center">
                    October 04, 2025 on
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Logo" className="h-3 ml-1" />
                  </div>
                </div>

                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="/avatar/meme.jpg" className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                      alt="User Avatar" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Thanh Nguyen</p>
                        <div className="text-sm text-accent-gold leading-none">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>
                  </div>
                  <p className="text-text-primary leading-relaxed text-sm mb-2">My aura is so bright now, I stopped paying my electricity bill. Thanks, Aura Dental!</p>
                  <div className="text-xs text-text-secondary flex items-center">
                    September 20, 2025 on
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Logo" className="h-3 ml-1" />
                  </div>
                </div>

                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="/avatar/cute.jpg" className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                      alt="User Avatar" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Boubacar Kande</p>
                        <div className="text-sm text-accent-gold leading-none">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>
                  </div>
                  <p className="text-text-primary leading-relaxed text-sm mb-2">Before Aura, I was just a person. Now, my smile is a cosmic beacon attracting only high-net-worth individuals and confused moths.</p>
                  <div className="text-xs text-text-secondary flex items-center">
                    September 15, 2025 on
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Logo" className="h-3 ml-1" />
                  </div>
                </div>

                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="/avatar/gangsta.png" className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                      alt="User Avatar" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Basil Kunnath</p>
                        <div className="text-sm text-accent-gold leading-none">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>
                  </div>
                  <p className="text-text-primary leading-relaxed text-sm mb-2">My phone camera thinks my smile is a lamp. I have to turn down the brightness because this aura is just too much. Five stars.</p>
                  <div className="text-xs text-text-secondary flex items-center">
                    July 10, 2025 on
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Logo" className="h-3 ml-1" />
                  </div>
                </div>

                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="/avatar/thug.jpg" className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                      alt="User Avatar" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Ayan Saiyed</p>
                        <div className="text-sm text-accent-gold leading-none">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>
                  </div>
                  <p className="text-text-primary leading-relaxed text-sm mb-2">My co-worker wears sunglasses when I talk to him now. He said my dental aura causes temporary blindness.</p>
                  <div className="text-xs text-text-secondary flex items-center">
                    July 5, 2025 on
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Logo" className="h-3 ml-1" />
                  </div>
                </div>

                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="/avatar/joker.webp" className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                      alt="User Avatar" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">The Joker</p>
                        <div className="text-sm text-accent-gold leading-none">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>
                  </div>
                  <p className="text-text-primary leading-relaxed text-sm mb-2">HA HA HA! All that laughing takes a toll, you know. I tried to pay in riddles, but the lady at the desk just handed me a payment terminal. Fine, I'll pay. But my smile is now the only punchline I need!</p>
                  <div className="text-xs text-text-secondary flex items-center">
                    June 1, 2025 on
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Logo" className="h-3 ml-1" />
                  </div>
                </div>

                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="/avatar/spiderman.jpg" className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                      alt="User Avatar" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Spiderman</p>
                        <div className="text-sm text-accent-gold leading-none">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>
                  </div>
                  <p className="text-text-primary leading-relaxed text-sm mb-2">With great power comes great responsibility... to maintain a pearly white smile! Aura Dental fixed my chipped incisor after a fight with Doc Ock. Their floss feels stronger than my webs. Wait, did I say that out loud?</p>
                  <div className="text-xs text-text-secondary flex items-center">
                    May 19, 2025 on
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Logo" className="h-3 ml-1" />
                  </div>
                </div>

                <div className="pb-4">
                  <div className="flex items-center mb-2">
                    <img src="/avatar/thanos.jpg" className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                      alt="User Avatar" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Thanos</p>
                        <div className="text-sm text-accent-gold leading-none">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>
                  </div>
                  <p className="text-text-primary leading-relaxed text-sm mb-2">I used the Infinity Stones to snap away half the universe, but even I couldn't snap away my plaque until I visited Aura Dental. My smile is now perfectly balanced, as all things should be. Also, the chair massages were inevitable.</p>
                  <div className="text-xs text-text-secondary flex items-center">
                    May 10, 2025 on
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Google Logo" className="h-3 ml-1" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section id="patients-section" className="py-24">
          <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-card-bg p-10 rounded-xl shadow-medium border border-gray-100">
              <h2 className="text-3xl font-bold text-primary-dark mb-6 border-b pb-3">Patient Records</h2>

              <div className="overflow-x-auto responsive-table-container">
                <table className="responsive-table min-w-full divide-y divide-gray-200">
                  <thead className="bg-accent-beige">
                    <tr>
                      <th className="p-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider hidden md:table-cell">ID</th>
                      <th className="p-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">Name</th>
                      <th className="p-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">Last Visit</th>
                      <th className="p-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider hidden sm:table-cell">Procedure</th>
                      <th className="p-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider hidden sm:table-cell">Phone</th>
                      <th className="p-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {patients.length === 0 ? (
                      <tr><td colSpan={6} className="p-4 text-center text-gray-500">No patient records found. Click 'Add New Patient' to create one.</td></tr>
                    ) : (
                      patients.map((patient) => (
                        <tr key={patient.id} className="bg-white hover:bg-gray-50">
                          <td className="p-4 text-sm font-medium text-text-primary hidden md:table-cell">{patient.id}</td>
                          <td className="p-4 text-sm text-text-secondary">{patient.name}</td>
                          <td className="p-4 text-sm text-text-secondary">{new Date(patient.lastVisit).toLocaleDateString()}</td>
                          <td className="p-4 text-sm text-text-secondary hidden sm:table-cell">{patient.procedure}</td>
                          <td className="p-4 text-sm text-text-secondary hidden sm:table-cell">{patient.phone}</td>
                          <td className="p-4 text-sm font-medium">
                            <button onClick={() => editPatient(patient.id)} className="text-button-primary hover:text-accent-gold font-semibold text-xs py-1 px-2 rounded-md">Edit</button>
                            <button onClick={() => showDeleteModal(patient.id, patient.name)} className="text-red-500 hover:text-red-700 font-semibold text-xs py-1 px-2 rounded-md ml-2">Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={() => editPatient()} className="px-6 py-3 bg-primary-dark text-white rounded-full font-bold">Add New Patient Record</button>
              </div>
            </div>
          </div>
        </section>

        <section id="form-section" className="py-24">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-card-bg p-10 rounded-xl shadow-medium border border-gray-100">
              <h2 className="text-3xl font-bold text-primary-dark mb-6 border-b pb-3">{editingPatientId ? 'Update Patient Record' : 'Add New Patient Record'}</h2>

              <form id="patient-form" className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Patient Full Name</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Date of Birth</label>
                  <input type="date" required value={form.dateOfBirth} onChange={(e) => setForm((f) => ({ ...f, dateOfBirth: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Last Visit Date</label>
                  <input type="date" required value={form.lastVisit} onChange={(e) => setForm((f) => ({ ...f, lastVisit: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Procedure Performed</label>
                  <select required value={form.procedure} onChange={(e) => setForm((f) => ({ ...f, procedure: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                    <option value="">Select a procedure</option>
                    <option>Comprehensive Oral Exam</option>
                    <option>Prophylaxis (Cleaning)</option>
                    <option>Restorative Filling</option>
                    <option>Endodontic Therapy</option>
                    <option>Surgical Extraction</option>
                    <option>Cosmetic Veneers Consultation</option>
                    <option>Invisalign Treatment Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Phone Number</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" />
                </div>
                <div className="pt-8 flex justify-between space-x-4">
                  <button type="button" onClick={() => scrollToSection('patients-section')} className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-full">Cancel</button>
                  <button type="submit" className="flex-1 py-3 px-4 bg-primary-dark text-white rounded-full font-bold">Save Patient Record</button>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      {deleteModal.visible && (
        <div id="delete-modal" className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-red-600 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to permanently delete the record for patient <strong>{deleteModal.name}</strong>?</p>
            <div className="flex justify-end space-x-3">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Cancel</button>
              <button onClick={() => deletePatient(deleteModal.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      <div id="app-toast" className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-xl transition-all duration-500 ${toast.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <div className={`${toast.classes} font-semibold`}>{toast.message}</div>
      </div>
    </div>
  );
};

export default DentalApp;
