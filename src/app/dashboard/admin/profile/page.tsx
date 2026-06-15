import React from 'react';
import Sidebar from '../../../../components/Sidebar';
import Navbar from '../../../../components/Navbar';

export default function ProfilePage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="rounded-l-2xl overflow-hidden">
          <Sidebar />
        </div>
        <main className="flex-1 flex flex-col items-center py-8 px-4 overflow-y-auto mt-10">
          <div className="w-full max-w-4xl space-y-8">
            {/* School Logo and Cover */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                <span className="text-gray-400">  <img src="/assets/cover.jpeg" alt="School Logo" className="object-contain rounded-xl" /></span>
              </div>
              <div className="-mt-16 mb-2">
                <div className="w-32 h-32 rounded-full bg-white shadow flex items-center justify-center overflow-hidden border-0 border-background">
                  <img src="/assets/kalutara vidyalaya.png" alt="School Logo" className="object-contain w-25 h-25 p-1" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-primary">Kalutara Vidyalaya National School</h1>
              <p className="text-lg text-gray-600 italic">- දෑ සමය සුරකිනු -</p>
            </div>

            {/* Basic Information */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">Basic Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><span className="font-medium">School Name:</span> <span className="font-bold">Kalutara Vidyalaya National School</span></div>
                <div><span className="font-medium">School ID / Reg. No:</span> <span className="font-bold">123456</span></div>
                <div><span className="font-medium">School Type:</span> <span className="font-bold">Public</span></div>
                <div><span className="font-medium">Affiliation Board:</span> <span className="font-bold">National</span></div>
                <div><span className="font-medium">Education Levels:</span> <span className="font-bold">Primary, Secondary, A/L</span></div>
                <div><span className="font-medium">Establishment Year:</span> <span className="font-bold">1890</span></div>
              </div>
            </section>

            {/* Location & Contact */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">Location & Contact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><span className="font-medium">Address:</span> 123 Main St</div>
                <div><span className="font-medium">City:</span> Kalutara</div>
                <div><span className="font-medium">District / State:</span> Western</div>
                <div><span className="font-medium">Country:</span> Sri Lanka</div>
                <div><span className="font-medium">Zip Code:</span> 12000</div>
                <div><span className="font-medium">Phone:</span> +94 34 222 1234</div>
                <div><span className="font-medium">Email:</span> info@kalutaravidyalaya.lk</div>
                <div><span className="font-medium">Website:</span> <a href="https://kalutaravidyalaya.lk" className="text-blue-600 underline">kalutaravidyalaya.lk</a></div>
                <div className="col-span-2"><span className="font-medium">Google Maps:</span> 6.5833° N, 79.9500° E</div>
              </div>
            </section>

            {/* Principal / Head Information */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">Principal / Head Information</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-400">[Photo]</span>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><span className="font-medium">Name:</span> Mr. S. Perera</div>
                  <div><span className="font-medium">Email:</span> principal@kalutaravidyalaya.lk</div>
                  <div><span className="font-medium">Phone:</span> +94 34 222 5678</div>
                  <div><span className="font-medium">Signature:</span> <span className="text-gray-400">[Signature]</span></div>
                </div>
              </div>
            </section>

            {/* Media */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">Media</h2>
              <div className="flex flex-wrap gap-4">
                <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center"><span className="text-gray-400">[Gallery Image]</span></div>
                <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center"><span className="text-gray-400">[Gallery Image]</span></div>
                <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center"><span className="text-gray-400">[Gallery Image]</span></div>
                <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center"><span className="text-gray-400">[Gallery Image]</span></div>
                <div className="w-64 h-32 bg-gray-200 rounded flex items-center justify-center"><span className="text-gray-400">[Intro Video]</span></div>
              </div>
            </section>

            {/* Administrative Details */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">Administrative Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><span className="font-medium">Total Students:</span> <span className="font-bold">3200</span></div>
                <div><span className="font-medium">Total Teachers:</span> <span className="font-bold">150</span></div>
                <div><span className="font-medium">Classrooms:</span> <span className="font-bold">60</span></div>
                <div><span className="font-medium">Grades:</span> <span className="font-bold">1-13</span></div>
                <div><span className="font-medium">Non-Academic Staff:</span> <span className="font-bold">30</span></div>
                <div><span className="font-medium">School Timings:</span> <span className="font-bold">7:30 AM - 1:30 PM</span></div>
                <div><span className="font-medium">School Code:</span> <span className="font-bold">KVNS-001</span></div>
              </div>
            </section>

            {/* Academic Information */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">Academic Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><span className="font-medium">Subjects Offered:</span> <span className="font-bold">Science, Maths, English, Sinhala, History, ICT, Commerce, Arts</span></div>
                <div><span className="font-medium">Curriculum:</span> <span className="font-bold">National Curriculum</span></div>
                <div><span className="font-medium">School Calendar:</span> <span className="text-gray-400">[Year Plan PDF]</span></div>
                <div><span className="font-medium">Extra-Curricular:</span> <span className="font-bold">Sports, Music, Drama, Debate</span></div>
                <div><span className="font-medium">Clubs / Societies:</span> <span className="font-bold">Science Club, Prefects, Scouts, Art Society</span></div>
                <div><span className="font-medium">Languages Taught:</span> <span className="font-bold">Sinhala, English, Tamil</span></div>
              </div>
            </section>

            {/* Payment & Fees */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">Payment & Fees</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><span className="font-medium">Bank Details:</span> <span className="text-gray-400">[Bank Info]</span></div>
                <div><span className="font-medium">Fee Structure:</span> <span className="text-gray-400">[Fee Structure PDF]</span></div>
                <div><span className="font-medium">Payment Modes:</span> <span className="font-bold">Cash, Bank Transfer</span></div>
                <div><span className="font-medium">UPI / QR Code:</span> <span className="text-gray-400">[QR Code]</span></div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
