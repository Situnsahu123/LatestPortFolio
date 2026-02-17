import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, ChevronDown, ExternalLink, Calendar, ArrowRight, Code, Eye, Heart, Share2, Sparkles, Zap, Rocket, Award, TrendingUp, Coffee, Send } from 'lucide-react';
import profileImg from './assets/profile.jpeg';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('home');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredProject, setHoveredProject] = useState(null);
    const [visibleSections, setVisibleSections] = useState({});
    const [likedProjects, setLikedProjects] = useState(new Set());
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [particles, setParticles] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init('2G3mqp_x7CfGJw0ID');
    }, []);

    // Track mouse position for interactive effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisibleSections(prev => ({
                        ...prev,
                        [entry.target.id]: true
                    }));
                }
            });
        }, { threshold: 0.1 });

        const sections = document.querySelectorAll('[data-animate]');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    // Scroll progress tracker
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const portfolioData = {
        name: "Situn Sahu",
        title: "Full Stack Developer",
        subtitle: "Building Exceptional Digital Experiences",
        email: "sahusitun92@gmail.com",
        phone: "+91 9321496195",
        location: "Mumbai, India",
        profileImage: profileImg,
        bio: "Passionate full-stack developer crafting beautiful, performant web applications. Specialized in creating responsive solutions that users love.",
        github: "https://github.com/Situnsahu123",
        linkedin: "https://www.linkedin.com/in/situn-sahu/",
        instagram: "https://www.instagram.com/sahusitun37/",

        skills: {
            frontend: ["React", "Angular", "TypeScript", "CSS3", "Responsive Design"],
            backend: ["Node.js", "Express", "MongoDB", "RESTful APIs", "Authentication"],
            tools: ["Git", "Docker", "AWS", "Webpack", "Figma"]
        },

        projects: [
            {
                id: 1,
                title: "Uber Clone",
                description: "Revolutionary ride-sharing platform with real-time tracking, payment integration, and intelligent routing algorithms.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
                tech: ["React", "Node.js", "MongoDB", "Google Maps API"],
                link: "#",
                featured: true,
                likes: 245,
                stats: { downloads: "2.5K", rating: "4.9" }
            },
            {
                id: 2,
                title: "Real-Time Chat Application",
                description: "Modern messaging platform with end-to-end encryption, group chats, and rich media support.",
                image: "data:image/jpeg;base64,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",
                tech: ["Angular", "Socket.io", "Express", "MongoDB"],
                link: "https://github.com/Situnsahu123/ChatApp",
                featured: true,
                likes: 189,
                stats: { downloads: "1.8K", rating: "4.8" }
            },
            {
                id: 3,
                title: "Task Management System",
                description: "Collaborative productivity tool with drag-and-drop boards, real-time updates, and team analytics.",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
                tech: ["React", "Redux", "Node.js", "MongoDB"],
                link: "https://github.com/Situnsahu123/taskManagement",
                featured: true,
                likes: 156,
                stats: { downloads: "1.5K", rating: "4.7" }
            },
            {
                id: 4,
                title: "E-commerce Platform",
                description: "Full-featured online store with advanced filtering, personalized recommendations, and secure checkout.",
                image: "data:image/jpeg;base64,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",
                tech: ["React", "Node.js", "Stripe API", "MongoDB"],
                link: "#",
                featured: false,
                likes: 134,
                stats: { downloads: "1.2K", rating: "4.6" }
            },
            {
                id: 5,
                title: "Social Media Dashboard",
                description: "Analytics powerhouse for monitoring metrics, engaging with audience, and optimizing content strategy.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
                tech: ["React", "Chart.js", "Node.js", "PostgreSQL"],
                link: "#",
                featured: false,
                likes: 98,
                stats: { downloads: "890", rating: "4.5" }
            }
        ],

        blogs: [
            {
                id: 1,
                title: "Building Scalable Applications with React and Node.js",
                excerpt: "Deep dive into architecture patterns, state management, and performance optimization for enterprise applications.",
                date: "Dec 15, 2024",
                readTime: "8 min read",
                category: "Backend",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
                views: 1200,
                featured: true
            },
            {
                id: 2,
                title: "Web Performance Optimization Techniques",
                excerpt: "Master code splitting, lazy loading, caching strategies, and performance monitoring for lightning-fast apps.",
                date: "Dec 10, 2024",
                readTime: "6 min read",
                category: "Performance",
                image: "data:image/jpeg;base64,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",
                views: 950,
                featured: true
            },
            {
                id: 3,
                title: "Authentication & Authorization in Modern Web Apps",
                excerpt: "Implement JWT, OAuth 2.0, session management, and multi-factor authentication securely.",
                date: "Dec 5, 2024",
                readTime: "10 min read",
                category: "Security",
                image: "data:image/jpeg;base64,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",
                views: 1500,
                featured: false
            },
            {
                id: 4,
                title: "Getting Started with MongoDB: A Complete Guide",
                excerpt: "Learn schema design, indexing strategies, aggregation pipeline, and real-world database patterns.",
                date: "Nov 28, 2024",
                readTime: "9 min read",
                category: "Database",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5Rdp4GFjP36IE9dfDzW5S61PRPgPhXDI5Q&s",
                views: 800,
                featured: false
            },
            {
                id: 5,
                title: "React Hooks: Simplify Your Component Logic",
                excerpt: "Master useState, useEffect, useContext, useReducer, and create powerful custom hooks.",
                date: "Nov 20, 2024",
                readTime: "7 min read",
                category: "Frontend",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
                views: 1100,
                featured: false
            },
            {
                id: 6,
                title: "CSS Grid vs Flexbox: When to Use Each",
                excerpt: "Master modern CSS layout techniques and create responsive designs like a professional.",
                date: "Nov 12, 2024",
                readTime: "5 min read",
                category: "Frontend",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
                views: 750,
                featured: false
            },
            {
                id: 7,
                title: "Building RESTful APIs with Express.js",
                excerpt: "Create robust, scalable REST APIs with proper error handling, validation, and testing.",
                date: "Nov 5, 2024",
                readTime: "8 min read",
                category: "Backend",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
                views: 1300,
                featured: false
            },
            {
                id: 8,
                title: "JavaScript ES6+ Features You Should Know",
                excerpt: "Explore modern JavaScript features, async/await, destructuring, and functional programming patterns.",
                date: "Oct 28, 2024",
                readTime: "7 min read",
                category: "Frontend",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
                views: 900,
                featured: false
            }
        ]
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('sending');
        setShowConfetti(true);

        try {
            await emailjs.send(
                'service_fti3flh',
                'template_4mptpwj',
                {
                    user_name: formData.name,
                    user_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: portfolioData.email
                }
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setShowConfetti(false), 2000);
            setTimeout(() => setSubmitStatus(''), 3000);
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(''), 3000);
        }
    };

    const toggleLike = (projectId) => {
        const newLiked = new Set(likedProjects);
        if (newLiked.has(projectId)) {
            newLiked.delete(projectId);
        } else {
            newLiked.add(projectId);
        }
        setLikedProjects(newLiked);
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(portfolioData.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white overflow-x-hidden">
            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-orange-500 z-[60]"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }}
            ></div>

            {/* Confetti Effect */}
            {showConfetti && <Confetti />}

            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-3xl opacity-30"></div>
            </div>

            {/* Interactive cursor glow */}
            <div
                className="fixed w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out opacity-0 hidden lg:block"
                style={{
                    left: `${mousePosition.x - 192}px`,
                    top: `${mousePosition.y - 192}px`,
                    opacity: 0.15
                }}
            ></div>

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-black/95 backdrop-blur-lg border-b border-red-600/20'
                : 'bg-transparent border-b border-transparent'
                }`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a href="#home" className="group">
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <Zap className="text-red-400" size={24} />
                                <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent group-hover:from-red-400 group-hover:via-red-300 group-hover:to-white transition-all duration-300">
                                    {portfolioData.name.split(' ')[0]}
                                </span>
                            </div>
                        </a>

                        {/* Desktop menu */}
                        <ul className="hidden md:flex gap-1">
                            {['Home', 'About', 'Projects', 'Blog', 'Contact'].map(item => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className={`px-4 py-2 rounded-lg transition-all duration-300 relative group ${activeNavItem === item.toLowerCase()
                                            ? 'text-red-400 bg-red-600/10'
                                            : 'text-gray-300 hover:text-white'
                                            }`}
                                        onMouseEnter={() => setActiveNavItem(item.toLowerCase())}
                                    >
                                        {item}
                                        <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300 ${activeNavItem === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}></span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-red-600/20 rounded-lg transition-all duration-300 group"
                        >
                            {isMenuOpen ? <X size={24} className="text-red-400" /> : <Menu size={24} className="group-hover:text-red-400 transition-colors" />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-4 space-y-2 animate-in">
                            {['Home', 'About', 'Projects', 'Blog', 'Contact'].map(item => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-red-600/10 border border-transparent hover:border-red-600/30 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
                        <div className="space-y-8 animate-fadeIn">
                            <div className="space-y-6">
                                <div className="inline-block group cursor-pointer">
                                    <div className="px-4 py-2 bg-white/10 border border-white/30 rounded-full group-hover:border-red-500 group-hover:bg-red-500/10 transition-all duration-300 flex items-center gap-2">
                                        <Sparkles className="text-red-400 animate-spin" size={16} />
                                        <p className="text-white text-sm font-semibold group-hover:text-red-400 transition-colors">Welcome to my creative space</p>
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                    <span className="block">Crafting</span>
                                    <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                                        Digital Magic
                                    </span>
                                    <span className="block">With Code</span>
                                </h1>
                                <p className="text-xl text-red-400 font-semibold">{portfolioData.title}</p>
                                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                                    {portfolioData.bio}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a
                                    href="#projects"
                                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-red-600/40 hover:scale-105 transition-all duration-300 text-center group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Explore Work <Rocket size={18} />
                                    </span>
                                </a>
                                <a
                                    href="#contact"
                                    className="px-8 py-4 border-2 border-red-600/50 text-white hover:border-red-600 hover:bg-red-600/10 rounded-lg font-semibold transition-all duration-300 text-center group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Start Project <Coffee size={18} />
                                    </span>
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-8">
                                <StatCard number="5" label="Projects" icon={<Code size={20} />} />
                                <StatCard number="0.6" label="Months Exp" icon={<TrendingUp size={20} />} />
                                <StatCard number="3" label="Tech Stacks" icon={<Zap size={20} />} />
                            </div>
                        </div>

                        {/* Right - Profile Image with animation */}
                        <div className="relative flex justify-center items-center animate-slideInRight group">
                            <div className="relative w-80 h-80 md:w-96 md:h-96">
                                {/* Animated border with red glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-red-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity"></div>
                                <div className="absolute inset-0 border-2 border-red-500/30 rounded-2xl group-hover:border-red-500/60 transition-all duration-300 animate-spin-slow"></div>

                                {/* Profile image */}
                                <img
                                    src={portfolioData.profileImage}
                                    alt={portfolioData.name}
                                    className="relative w-full h-full rounded-2xl object-cover border-4 border-white/50 group-hover:border-red-400 shadow-2xl group-hover:shadow-red-600/50 transition-all duration-300 group-hover:scale-105"
                                />

                                {/* Badge */}
                                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/50 group-hover:border-red-400 transition-all duration-300 group-hover:bg-black/90 group-hover:shadow-lg group-hover:shadow-red-600/50 hover:scale-110 animate-bounce-slow">
                                    <div className="flex items-center gap-2">
                                        <Award className="text-red-400 animate-pulse" size={20} />
                                        <span className="text-sm font-semibold group-hover:text-red-400 transition-colors">Full Stack</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce group cursor-pointer">
                        <ChevronDown className="text-white/50 group-hover:text-red-400 transition-colors" size={32} />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative py-24 px-4" data-animate>
                <div className={`max-w-5xl mx-auto transition-all duration-1000 ${visibleSections['about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="mb-16 flex items-center gap-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                                About Me
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-gray-300 text-lg leading-relaxed group hover:text-white/90 transition-colors hover:bg-white/5 p-4 rounded-lg border border-white/10 hover:border-red-500/30">
                                {portfolioData.bio}
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed group hover:text-white/90 transition-colors hover:bg-white/5 p-4 rounded-lg border border-white/10 hover:border-red-500/30">
                                I'm obsessed with clean code, pixel-perfect designs, and creating experiences that delight users. Every line of code I write is crafted with intention and passion.
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed group hover:text-white/90 transition-colors hover:bg-white/5 p-4 rounded-lg border border-white/10 hover:border-red-500/30">
                                When I'm not coding, you'll find me exploring new tech, contributing to open-source, or sharing knowledge with the developer community.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <SkillCategory
                                title="Frontend"
                                skills={portfolioData.skills.frontend}
                                icon={<Code size={20} />}
                            />
                            <SkillCategory
                                title="Backend"
                                skills={portfolioData.skills.backend}
                                icon={<Zap size={20} />}
                            />
                            <SkillCategory
                                title="Tools & More"
                                skills={portfolioData.skills.tools}
                                icon={<Rocket size={20} />}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="relative py-24 px-4" data-animate>
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="mb-16 flex items-center gap-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                                Featured Projects
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioData.projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                hovered={hoveredProject === project.id}
                                onHover={(id) => setHoveredProject(id)}
                                isLiked={likedProjects.has(project.id)}
                                onLike={() => toggleLike(project.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="relative py-24 px-4" data-animate>
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${visibleSections['blog'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="mb-16 flex items-center gap-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                                Latest Articles
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioData.blogs.map((blog, index) => (
                            <BlogCard key={blog.id} blog={blog} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative py-24 px-4" data-animate>
                <div className={`max-w-5xl mx-auto transition-all duration-1000 ${visibleSections['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="mb-16 flex items-center gap-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                                Let's Connect
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <p className="text-gray-300 text-lg">
                                Ready to start something amazing? Let's chat about your next project!
                            </p>

                            <div className="space-y-4">
                                <ContactItem
                                    icon={<Mail size={24} />}
                                    label="Email"
                                    value={portfolioData.email}
                                    href={`mailto:${portfolioData.email}`}
                                    onCopy={copyEmail}
                                    copied={copiedEmail}
                                />
                                <ContactItem
                                    icon={<Phone size={24} />}
                                    label="Phone"
                                    value={portfolioData.phone}
                                    href={`tel:${portfolioData.phone}`}
                                />
                                <ContactItem
                                    icon={<MapPin size={24} />}
                                    label="Location"
                                    value={portfolioData.location}
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <SocialLink href={portfolioData.github} icon={<Github size={24} />} label="GitHub" />
                                <SocialLink href={portfolioData.linkedin} icon={<Linkedin size={24} />} label="LinkedIn" />
                                <SocialLink href={`mailto:${portfolioData.email}`} icon={<Mail size={24} />} label="Email" />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg text-center animate-pulse flex items-center justify-center gap-2">
                                    <span>✓ Message sent successfully!</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-center">
                                    ✗ Failed to send message. Please try again.
                                </div>
                            )}

                            <div className="group">
                                <label className="block text-gray-300 font-medium mb-2 group-hover:text-red-400 transition-colors">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    disabled={submitStatus === 'sending'}
                                    className="w-full px-4 py-2 bg-gray-950/50 border border-white/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 hover:border-red-500/50 transition-all disabled:opacity-50 group-hover:border-red-500/50"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-gray-300 font-medium mb-2 group-hover:text-red-400 transition-colors">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={submitStatus === 'sending'}
                                    className="w-full px-4 py-2 bg-gray-950/50 border border-white/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 hover:border-red-500/50 transition-all disabled:opacity-50 group-hover:border-red-500/50"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-gray-300 font-medium mb-2 group-hover:text-red-400 transition-colors">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    disabled={submitStatus === 'sending'}
                                    className="w-full px-4 py-2 bg-gray-950/50 border border-white/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 hover:border-red-500/50 transition-all disabled:opacity-50 group-hover:border-red-500/50"
                                    placeholder="Project inquiry"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-gray-300 font-medium mb-2 group-hover:text-red-400 transition-colors">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    disabled={submitStatus === 'sending'}
                                    rows="4"
                                    className="w-full px-4 py-2 bg-gray-950/50 border border-white/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 hover:border-red-500/50 transition-all resize-none disabled:opacity-50 group-hover:border-red-500/50"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitStatus === 'sending'}
                                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-red-600/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 group relative overflow-hidden flex items-center justify-center gap-2"
                            >
                                <span className="relative z-10">
                                    {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                </span>
                                {submitStatus !== 'sending' && <Send size={18} />}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-red-600/20 py-8 px-4">
                <div className="max-w-6xl mx-auto text-center text-gray-400 group hover:text-gray-300 transition-colors">
                    <p>© 2024 {portfolioData.name}. Crafted with ❤️ and React. All rights reserved.</p>
                </div>
            </footer>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
                .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
                .animate-slideUp { animation: slideUp 0.6s ease-out; }
                .animate-scaleIn { animation: scaleIn 0.6s ease-out; }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-in { animation: fadeIn 0.4s ease-out; }
            `}</style>
        </div>
    );
};

// Confetti Component
function Confetti() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
            {[...Array(50)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse"
                    style={{
                        left: Math.random() * 100 + '%',
                        top: -10,
                        animation: `fall ${2 + Math.random() * 1}s linear forwards`,
                        opacity: Math.random() * 0.7 + 0.3
                    }}
                />
            ))}
            <style>{`
                @keyframes fall {
                    to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
            `}</style>
        </div>
    );
}

// Stat Card Component
function StatCard({ number, label, icon }) {
    return (
        <div className="text-center group hover:bg-red-600/10 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-red-600/30 cursor-pointer hover:scale-110">
            <div className="flex justify-center mb-2 group-hover:text-red-400 transition-colors">
                {icon}
            </div>
            <div className="text-3xl font-bold text-white group-hover:text-red-400 transition-colors">
                {number}
            </div>
            <p className="text-gray-400 text-sm group-hover:text-red-300 transition-colors">{label}</p>
        </div>
    );
}

// Skill Category Component
function SkillCategory({ title, skills, icon }) {
    return (
        <div className="group">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 group-hover:scale-110 transition-transform">
                    {icon}
                </span>
                <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 bg-white/10 border border-white/30 text-gray-300 rounded-full text-sm font-medium hover:bg-red-600/20 hover:border-red-500 hover:text-red-300 hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

// Project Card Component
function ProjectCard({ project, index, hovered, onHover, isLiked, onLike }) {
    return (
        <div
            className="group relative bg-gray-950/50 border border-white/20 rounded-xl overflow-hidden hover:border-red-500 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/30 cursor-pointer animate-slideUp"
            onMouseEnter={() => onHover(project.id)}
            onMouseLeave={() => onHover(null)}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="h-48 overflow-hidden bg-gray-900/50 relative">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.featured && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-red-600/50 flex items-center gap-1">
                        <Award size={12} /> Featured
                    </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                        <button
                            onClick={(e) => { e.preventDefault(); onLike(); }}
                            className="p-2 bg-white/10 hover:bg-red-600 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-110 hover:shadow-lg hover:shadow-red-600/50"
                        >
                            <Heart size={18} className={`transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-110">
                            <Share2 size={18} className="text-white hover:text-red-400 transition-colors" />
                        </button>
                    </div>
                    <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full hover:bg-red-600/50 transition-all">
                        {isLiked ? project.likes + 1 : project.likes} ❤️
                    </span>
                </div>
            </div>
            <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs border border-white/20 group-hover:border-red-500 group-hover:text-red-300 transition-all hover:bg-red-600/20">
                            {t}
                        </span>
                    ))}
                </div>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-red-400 transition-colors mt-2 group">
                        View Project <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                )}
            </div>
        </div>
    );
}

// Blog Card Component
function BlogCard({ blog, index }) {
    return (
        <div
            className="group relative bg-gray-950/50 border border-white/20 rounded-xl overflow-hidden hover:border-red-500 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/30 cursor-pointer animate-slideUp"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="h-40 overflow-hidden bg-gray-900/50 relative">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
            </div>
            <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white bg-red-600/20 px-3 py-1 rounded-full border border-red-600/50 group-hover:border-red-500 group-hover:bg-red-600/30 transition-all">
                        {blog.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1 group-hover:text-red-400 transition-colors">
                        <Eye size={14} /> {blog.views}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">{blog.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{blog.excerpt}</p>
                <div className="flex items-center justify-between pt-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={14} /> {blog.date}
                    </span>
                    <span className="text-xs text-gray-500">{blog.readTime}</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-white/70 hover:text-red-400 transition-colors mt-2">
                    Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    );
}

// Contact Item Component
function ContactItem({ icon, label, value, href, onCopy, copied }) {
    const content = (
        <div className="flex gap-4 items-start group cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-all duration-300" onClick={onCopy}>
            <div className="text-white group-hover:text-red-400 group-hover:scale-110 transition-all duration-300">{icon}</div>
            <div>
                <p className="text-gray-500 text-sm group-hover:text-red-400 transition-colors">{label}</p>
                <p className="text-white font-medium group-hover:text-red-300 transition-colors">{copied ? '✓ Copied!' : value}</p>
            </div>
        </div>
    );

    return href ? <a href={href}>{content}</a> : content;
}

// Social Link Component
function SocialLink({ href, icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className="p-3 bg-white/10 border border-white/30 text-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 hover:bg-red-600/20 hover:scale-110 hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300"
        >
            {icon}
        </a>
    );
}

export default App;