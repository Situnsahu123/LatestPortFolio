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
                image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
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
                image: "https://images.unsplash.com/photo-1460925895917-adf4e0f1a5a1?w=500&h=300&fit=crop",
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
                image: "https://images.unsplash.com/photo-1516534775068-bb57ce3b5d83?w=400&h=250&fit=crop",
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
                image: "https://images.unsplash.com/photo-1517694712622-2f3fcb008fa7?w=400&h=250&fit=crop",
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
                image: "https://images.unsplash.com/photo-1516542267542-c5ef00eaba99?w=400&h=250&fit=crop",
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