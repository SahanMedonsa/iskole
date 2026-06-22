"use client";
import Navbar from '../../../../../components/Navbar';
import Sidebar from '../../../../../components/Sidebar';
import { useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const initialLessons = [
  {
    id: 1,
    title: 'Lesson 1: Introduction',
    professional: 'Mr. Perera',
    materials: [
      { type: 'pdf', name: 'Introduction Notes', url: '/materials/intro.pdf', description: 'Introductory notes.' },
      { type: 'youtube', name: 'Intro Video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Watch this intro.' },
    ],
  },
  {
    id: 2,
    title: 'Lesson 2: Advanced Concepts',
    professional: 'Ms. Silva',
    materials: [
      { type: 'pdf', name: 'Advanced Notes', url: '/materials/advanced.pdf', description: 'Advanced notes.' },
      { type: 'youtube', name: 'Advanced Video', url: 'https://www.youtube.com/watch?v=9bZkp7q19f0', description: 'Advanced video.' },
    ],
  },
];

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
}

export default function SubjectLessonsPage({ params }: { params: Promise<{ grade: string; subject: string }> }) {
  const { grade, subject } = use(params);
  const router = useRouter();
  const [openLesson, setOpenLesson] = useState<number | null>(null);
  const [lessons, setLessons] = useState(initialLessons);
  const [showPdfModal, setShowPdfModal] = useState<{ open: boolean; lessonId: number | null }>({ open: false, lessonId: null });
  const [showVideoModal, setShowVideoModal] = useState<{ open: boolean; lessonId: number | null }>({ open: false, lessonId: null });
  const [pdfForm, setPdfForm] = useState<{ title: string; description: string; file: File | null }>({ title: '', description: '', file: null });
  const [videoForm, setVideoForm] = useState({ title: '', description: '', link: '' });
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [lessonForm, setLessonForm] = useState({ title: '', professional: '' });

  // PDF handlers
  const openPdf = (lessonId: number) => { setShowPdfModal({ open: true, lessonId }); setPdfForm({ title: '', description: '', file: null }); };
  const openVideo = (lessonId: number) => { setShowVideoModal({ open: true, lessonId }); setVideoForm({ title: '', description: '', link: '' }); };
  const closePdf = () => setShowPdfModal({ open: false, lessonId: null });
  const closeVideo = () => setShowVideoModal({ open: false, lessonId: null });

  const handlePdfSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pdfForm.title || !pdfForm.file) return;
    setLessons(lessons => lessons.map(lesson => lesson.id === showPdfModal.lessonId ? {
      ...lesson,
      materials: [...lesson.materials, {
        type: 'pdf',
        name: pdfForm.title,
        url: URL.createObjectURL(pdfForm.file!),
        description: pdfForm.description
      }]
    } : lesson));
    closePdf();
  };

  const handleVideoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.link) return;
    setLessons(lessons => lessons.map(lesson => lesson.id === showVideoModal.lessonId ? {
      ...lesson,
      materials: [...lesson.materials, {
        type: 'youtube',
        name: videoForm.title,
        url: videoForm.link,
        description: videoForm.description
      }]
    } : lesson));
    closeVideo();
  };

  const handleAddLesson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lessonForm.title || !lessonForm.professional) return;
    setLessons([...lessons, {
      id: lessons.length ? Math.max(...lessons.map(l => l.id)) + 1 : 1,
      title: lessonForm.title,
      professional: lessonForm.professional,
      materials: []
    }]);
    setLessonForm({ title: '', professional: '' });
    setShowAddLessonModal(false);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <button
            onClick={() => router.push(`/dashboard/learnings/${grade}`)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold px-2 py-2 rounded transition cursor-pointer mb-4"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Subjects
          </button>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary mb-4">Lessons for {subject} (Class {grade})</h1>
            <button onClick={() => setShowAddLessonModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">+ Add Lesson</button>
          </div>
          <div className="space-y-4">
            {lessons.map(lesson => (
              <div key={lesson.id} className="bg-white rounded-xl shadow">
                <button
                  className="w-full flex justify-between items-center p-4 text-lg font-semibold text-blue-700 focus:outline-none"
                  onClick={() => setOpenLesson(openLesson === lesson.id ? null : lesson.id)}
                >
                  <span>{lesson.title}</span>
                  <span>{openLesson === lesson.id ? '▲' : '▼'}</span>
                </button>
                {openLesson === lesson.id && (
                  <div className="border-t px-6 pb-4">
                    <div className="mb-2 text-gray-700"><b>Professional:</b> {lesson.professional}</div>
                    <div className="flex gap-2 justify-end mt-2 mb-2">
                      <button onClick={() => openPdf(lesson.id)} className="bg-blue-500 text-white px-3 py-1 rounded font-semibold hover:bg-blue-600 transition text-sm">+ Add PDF</button>
                      <button onClick={() => openVideo(lesson.id)} className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-600 transition text-sm">+ Add Video</button>
                    </div>
                    <ul className="space-y-2">
                      {lesson.materials.map((mat, idx) => (
                        <li key={idx} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                          {mat.type === 'pdf' && (
                            <a href={mat.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-2">
                              <span>📄</span> {mat.name}
                              {mat.description && <span className="text-xs text-gray-500 ml-2">{mat.description}</span>}
                            </a>
                          )}
                          {mat.type === 'youtube' && (
                            <a href={mat.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <Image src={getYoutubeThumbnail(mat.url)!} alt="YouTube Thumbnail" width={64} height={40} className="w-16 h-10 object-cover rounded" />
                              <span className="text-blue-600 underline">{mat.name}</span>
                              {mat.description && <span className="text-xs text-gray-500 ml-2">{mat.description}</span>}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* PDF Modal */}
          {showPdfModal.open && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <form onSubmit={handlePdfSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add PDF</h2>
                <input type="text" placeholder="Title" className="border rounded px-3 py-2 w-full mb-2" value={pdfForm.title} onChange={e => setPdfForm(f => ({ ...f, title: e.target.value }))} required />
                <textarea placeholder="Description" className="border rounded px-3 py-2 w-full mb-2" value={pdfForm.description} onChange={e => setPdfForm(f => ({ ...f, description: e.target.value }))} />
                <input type="file" accept="application/pdf" className="mb-4" onChange={e => setPdfForm(f => ({ ...f, file: e.target.files[0] }))} required />
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={closePdf} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">Add PDF</button>
                </div>
              </form>
            </div>
          )}

          {/* Video Modal */}
          {showVideoModal.open && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <form onSubmit={handleVideoSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add YouTube Video</h2>
                <input type="text" placeholder="Title" className="border rounded px-3 py-2 w-full mb-2" value={videoForm.title} onChange={e => setVideoForm(f => ({ ...f, title: e.target.value }))} required />
                <textarea placeholder="Description" className="border rounded px-3 py-2 w-full mb-2" value={videoForm.description} onChange={e => setVideoForm(f => ({ ...f, description: e.target.value }))} />
                <input type="url" placeholder="YouTube Link" className="border rounded px-3 py-2 w-full mb-2" value={videoForm.link} onChange={e => setVideoForm(f => ({ ...f, link: e.target.value }))} required />
                {videoForm.link && getYoutubeThumbnail(videoForm.link) && (
                  <Image src={getYoutubeThumbnail(videoForm.link)!} alt="YouTube Preview" width={128} height={80} className="w-32 h-20 object-cover rounded mb-2 mx-auto" />
                )}
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={closeVideo} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-red-600 text-white font-semibold">Add Video</button>
                </div>
              </form>
            </div>
          )}

          {/* Add Lesson Modal */}
          {showAddLessonModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <form onSubmit={handleAddLesson} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Lesson</h2>
                <input type="text" placeholder="Lesson Title" className="border rounded px-3 py-2 w-full mb-2" value={lessonForm.title} onChange={e => setLessonForm(f => ({ ...f, title: e.target.value }))} required />
                <input type="text" placeholder="Professional/Teacher" className="border rounded px-3 py-2 w-full mb-4" value={lessonForm.professional} onChange={e => setLessonForm(f => ({ ...f, professional: e.target.value }))} required />
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setShowAddLessonModal(false)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">Add Lesson</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}