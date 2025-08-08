import React, { useState, useEffect } from 'react';
import { Lightbulb, Book, Code, Users, Search, Target, Briefcase, Layout, Palette, BarChart, FileText, CheckCircle, Square, CheckSquare, RotateCcw } from 'lucide-react';

// Helper component for a single skill item with tracking
const SkillItem = ({ id, icon: Icon, title, description, isCompleted, onToggleComplete }) => (
  <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <button
      onClick={() => onToggleComplete(id)}
      className="flex-shrink-0 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
    >
      {isCompleted ? (
        <CheckSquare className="w-6 h-6 text-green-500" />
      ) : (
        <Square className="w-6 h-6 text-gray-400" />
      )}
    </button>
    <div className={isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

// Helper component for a weekly module
const WeeklyModule = ({ week, title, skills, dailyFocus, track, completedTasks, onToggleComplete }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg border border-blue-200 mb-8">
    <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
      <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">
        {week}
      </span>
      {title}
      {track && <span className="ml-3 px-3 py-1 bg-blue-200 text-blue-800 text-xs font-medium rounded-full">{track}</span>}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      {skills.map((skill, index) => {
        const taskId = `${week}-${track || 'General'}-${index}`;
        return (
          <SkillItem
            key={taskId}
            id={taskId}
            icon={skill.icon}
            title={skill.title}
            description={skill.description}
            isCompleted={completedTasks[taskId]}
            onToggleComplete={onToggleComplete}
          />
        );
      })}
    </div>
    <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
        <Target className="w-5 h-5 mr-2" /> Daily Focus (2-3 hours)
      </h4>
      <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
        {dailyFocus.map((focus, index) => (
          <li key={index}>{focus}</li>
        ))}
      </ul>
    </div>
  </div>
);

function App() {
  const [completedTasks, setCompletedTasks] = useState(() => {
    // Initialize state from localStorage
    try {
      const saved = localStorage.getItem('roadmapProgress');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to parse roadmap progress from localStorage", error);
      return {};
    }
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('roadmapProgress', JSON.stringify(completedTasks));
    } catch (error) {
      console.error("Failed to save roadmap progress to localStorage", error);
    }
  }, [completedTasks]);

  const handleToggleComplete = (id) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle completion status
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      setCompletedTasks({});
      localStorage.removeItem('roadmapProgress');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter p-4 sm:p-8">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
          /* Custom scrollbar for better aesthetics */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          3-Month Internship Skill Roadmap
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          A structured plan to acquire essential skills for any internship, dedicating 2-3 hours daily.
          Click the square icon next to each skill to mark it as complete! Your progress will be saved.
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleResetProgress}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <RotateCcw className="w-5 h-5 mr-2" /> Reset All Progress
          </button>
        </div>

        {/* Month 1 */}
        <h2 className="text-3xl font-bold text-purple-700 mb-6 border-b-2 border-purple-300 pb-2">
          Month 1: Foundation & General Skills
        </h2>
        <WeeklyModule
          week="Week 1"
          title="Problem-Solving & Analytical Thinking"
          skills={[
            { icon: Lightbulb, title: 'Critical Thinking', description: 'Develop logical reasoning and structured thinking.' },
            { icon: Book, title: 'Case Study Analysis', description: 'Break down complex problems into manageable parts.' },
          ]}
          dailyFocus={[
            '1 hr: Online course/tutorials on critical thinking & logical reasoning.',
            '1 hr: Practice brain teasers, puzzles, and simple case studies.',
            '0.5 hr: Read articles on problem-solving methodologies.',
          ]}
          completedTasks={completedTasks}
          onToggleComplete={handleToggleComplete}
        />
        <WeeklyModule
          week="Week 2"
          title="Communication Skills (Written)"
          skills={[
            { icon: FileText, title: 'Resume & Cover Letter Crafting', description: 'Learn to create ATS-friendly and impactful documents.' },
            { icon: Briefcase, title: 'Professional Email Etiquette', description: 'Master clear and concise written communication.' },
          ]}
          dailyFocus={[
            '1 hr: Learn resume/cover letter best practices (online guides, templates).',
            '1 hr: Draft and refine your resume and a general cover letter.',
            '0.5 hr: Practice writing professional emails for different scenarios.',
          ]}
          completedTasks={completedTasks}
          onToggleComplete={handleToggleComplete}
        />
        <WeeklyModule
          week="Week 3"
          title="Communication Skills (Verbal)"
          skills={[
            { icon: Users, title: 'Mock Interview Practice', description: 'Improve articulation and confidence in verbal interactions.' },
            { icon: Lightbulb, title: 'Concept Explanation', description: 'Practice explaining complex ideas clearly and concisely.' },
          ]}
          dailyFocus={[
            '1 hr: Watch videos on interview techniques and effective verbal communication.',
            '1 hr: Practice answering common interview questions out loud; record yourself.',
            '0.5 hr: Explain a technical/business concept to a friend or family member.',
          ]}
          completedTasks={completedTasks}
          onToggleComplete={handleToggleComplete}
        />
        <WeeklyModule
          week="Week 4"
          title="E-commerce Landscape & Flipkart Research"
          skills={[
            { icon: Search, title: 'Industry Trends', description: 'Understand current trends and future directions in e-commerce.' },
            { icon: CheckCircle, title: 'Flipkart Deep Dive', description: 'Research Flipkart\'s business model, values, and recent initiatives.' },
          ]}
          dailyFocus={[
            '1 hr: Read industry reports, tech news, and e-commerce blogs.',
            '1 hr: Explore Flipkart\'s website, career page, and news articles about them.',
            '0.5 hr: Identify specific Flipkart initiatives that interest you and why.',
          ]}
          completedTasks={completedTasks}
          onToggleComplete={handleToggleComplete}
        />

        {/* Month 2 */}
        <h2 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-300 pb-2 mt-12">
          Month 2: Core Domain-Specific Skills (Choose ONE Track)
        </h2>

        {/* Technical Track */}
        <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-200 mb-8">
          <h3 className="text-2xl font-bold text-green-700 mb-4">
            Track A: Technical (Software Dev, Data Eng, ML/AI)
          </h3>
          <WeeklyModule
            week="Week 5-6"
            title="Data Structures & Algorithms (Basics) & Language"
            track="Technical"
            skills={[
              { icon: Code, title: 'DSA Fundamentals', description: 'Arrays, Linked Lists, Stacks, Queues, Hash Maps.' },
              { icon: Book, title: 'Basic Algorithms', description: 'Sorting (Bubble, Selection, Insertion), Searching (Linear, Binary).' },
            ]}
            dailyFocus={[
              '1 hr: Online course on DSA (e.g., GeeksForGeeks, Coursera).',
              '1 hr: Solve 2-3 easy/medium problems on LeetCode/HackerRank.',
              '0.5 hr: Learn syntax and basic concepts of your chosen language (Python/Java/C++).',
            ]}
            completedTasks={completedTasks}
            onToggleComplete={handleToggleComplete}
          />
          <WeeklyModule
            week="Week 7-8"
            title="Advanced DSA & OOP Concepts"
            track="Technical"
            skills={[
              { icon: Code, title: 'Advanced DSA', description: 'Trees (BST), Graphs, Heaps, Dynamic Programming intro.' },
              { icon: Lightbulb, title: 'OOP Principles', description: 'Encapsulation, Inheritance, Polymorphism, Abstraction.' },
            ]}
            dailyFocus={[
              '1 hr: Continue DSA course, focus on Trees, Graphs, DP.',
              '1 hr: Solve 2-3 medium/hard problems on LeetCode/HackerRank.',
              '0.5 hr: Practice implementing OOP concepts in your chosen language.',
            ]}
            completedTasks={completedTasks}
            onToggleComplete={handleToggleComplete}
          />
        </div>

        {/* Business/Product/Marketing Track */}
        <div className="bg-orange-50 p-6 rounded-xl shadow-lg border border-orange-200 mb-8">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">
            Track B: Business (Product Mgmt, Marketing, Analytics)
          </h3>
          <WeeklyModule
            week="Week 5-6"
            title="Product/Marketing Fundamentals & Market Research"
            track="Business"
            skills={[
              { icon: Lightbulb, title: 'PM/Marketing Basics', description: 'User research, market analysis, digital marketing channels.' },
              { icon: Search, title: 'Market Research', description: 'Understand customer needs and competitive landscape.' },
            ]}
            dailyFocus={[
              '1 hr: Online course on Product Management or Digital Marketing.',
              '1 hr: Analyze a feature of a popular e-commerce app; identify user pain points.',
              '0.5 hr: Read blogs/articles on market research techniques.',
            ]}
            completedTasks={completedTasks}
            onToggleComplete={handleToggleComplete}
          />
          <WeeklyModule
            week="Week 7-8"
            title="Data Analysis Basics & Case Studies"
            track="Business"
            skills={[
              { icon: BarChart, title: 'Excel Proficiency', description: 'Advanced formulas, pivot tables, data visualization.' },
              { icon: Code, title: 'SQL Introduction', description: 'Basic queries for data extraction.' },
            ]}
            dailyFocus={[
              '1 hr: Excel tutorials (focus on data analysis functions).',
              '1 hr: Practice SQL queries on online platforms (e.g., LeetCode SQL).',
              '0.5 hr: Work through business case studies requiring data interpretation.',
            ]}
            completedTasks={completedTasks}
            onToggleComplete={handleToggleComplete}
          />
        </div>

        {/* UI/UX Track */}
        <div className="bg-pink-50 p-6 rounded-xl shadow-lg border border-pink-200 mb-8">
          <h3 className="text-2xl font-bold text-pink-700 mb-4">
            Track C: UI/UX
          </h3>
          <WeeklyModule
            week="Week 5-6"
            title="UX Principles & User Research"
            track="UI/UX"
            skills={[
              { icon: Layout, title: 'UX Fundamentals', description: 'Usability, accessibility, user-centered design principles.' },
              { icon: Users, title: 'User Research Methods', description: 'User personas, journey mapping, basic usability testing.' },
            ]}
            dailyFocus={[
              '1 hr: Online course on UX design (e.g., Google UX Design Certificate).',
              '1 hr: Analyze a website/app for UX issues; create a simple user persona.',
              '0.5 hr: Read articles from Nielsen Norman Group.',
            ]}
            completedTasks={completedTasks}
            onToggleComplete={handleToggleComplete}
          />
          <WeeklyModule
            week="Week 7-8"
            title="Wireframing, Prototyping & Visual Design"
            track="UI/UX"
            skills={[
              { icon: Palette, title: 'Figma Proficiency', description: 'Master wireframing and prototyping in Figma.' },
              { icon: Layout, title: 'Visual Design Basics', description: 'Typography, color theory, layout principles.' },
            ]}
            dailyFocus={[
              '1 hr: Figma tutorials (focus on creating wireframes and interactive prototypes).',
              '1 hr: Recreate a few screens from popular apps in Figma.',
              '0.5 hr: Learn about basic visual design principles and apply them.',
            ]}
            completedTasks={completedTasks}
            onToggleComplete={handleToggleComplete}
          />
        </div>

        {/* Month 3 */}
        <h2 className="text-3xl font-bold text-teal-700 mb-6 border-b-2 border-teal-300 pb-2 mt-12">
          Month 3: Advanced, Projects & Application
        </h2>
        <WeeklyModule
          week="Week 9-10"
          title="Project Work & Deep Dive"
          skills={[
            { icon: Briefcase, title: 'Hands-on Project', description: 'Apply learned skills to build a substantial project.' },
            { icon: Lightbulb, title: 'Specialized Learning', description: 'Deep dive into specific areas of your chosen track.' },
          ]}
          dailyFocus={[
            '1.5-2 hrs: Work on your chosen project (coding, design, analysis, etc.).',
            '0.5-1 hr: Explore advanced topics related to your track (e.g., System Design, A/B Testing, advanced ML concepts, UX research methods).',
          ]}
          completedTasks={completedTasks}
          onToggleComplete={handleToggleComplete}
        />
        <WeeklyModule
          week="Week 11"
          title="Refine Skills & Portfolio"
          skills={[
            { icon: CheckCircle, title: 'Skill Assessment', description: 'Identify and strengthen your weaker skill areas.' },
            { icon: FileText, title: 'Portfolio/GitHub Polish', description: 'Document your projects thoroughly and make them presentable.' },
          ]}
          dailyFocus={[
            '1 hr: Revisit challenging DSA problems or business cases.',
            '1 hr: Document your project(s) on GitHub/portfolio site, write clear READMEs.',
            '0.5 hr: Get feedback on your resume/portfolio from peers or mentors.',
          ]}
          completedTasks={completedTasks}
          onToggleComplete={handleToggleComplete}
        />
        <WeeklyModule
          week="Week 12"
          title="Interview Preparation & Application"
          skills={[
            { icon: Users, title: 'Mock Interviews', description: 'Practice technical, behavioral, and case study interviews.' },
            { icon: Briefcase, title: 'Targeted Applications', description: 'Apply to Flipkart and other relevant internships.' },
          ]}
          dailyFocus={[
            '1 hr: Daily mock interview practice (with friends/mentors or self-recording).',
            '1 hr: Research specific company roles, tailor resume/cover letter for each application.',
            '0.5 hr: Network on LinkedIn, look for referrals.',
          ]}
          completedTasks={completedTasks}
          onToggleComplete={handleToggleComplete}
        />

        <p className="text-center text-gray-700 mt-10 text-lg font-medium">
          Consistency is key! Stick to your daily commitment and adapt this roadmap to your learning style and progress. Good luck!
        </p>
      </div>
    </div>
  );
}

export default App;