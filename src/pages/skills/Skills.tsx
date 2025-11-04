import React from 'react';
import { Box, Container, Typography, Card, CardContent, Chip, Stack, LinearProgress, Tooltip } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface SkillItem {
    name: string;
    level?: number; // 0-100
}

interface SkillCategory {
    id: string;
    title: string;
    skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
    {
        id: 'languages',
        title: 'Programming Languages',
        skills: [
            { name: 'TypeScript', level: 85 },
            { name: 'JavaScript', level: 90 },
            { name: 'Python', level: 80 },
            { name: 'SQL', level: 75 },
            { name: 'C++', level: 60 },
        ],
    },
    {
        id: 'frontend',
        title: 'Frontend Frameworks & UI',
        skills: [
            { name: 'React', level: 90 },
            { name: 'Next.js', level: 70 },
            { name: 'Redux/RTK', level: 75 },
            { name: 'Material UI', level: 85 },
            { name: 'Tailwind CSS', level: 70 },
        ],
    },
    {
        id: 'backend',
        title: 'Backend & APIs',
        skills: [
            { name: 'Node.js', level: 85 },
            { name: 'Express', level: 85 },
            { name: 'REST', level: 90 },
            { name: 'GraphQL', level: 60 },
            { name: 'WebSockets', level: 65 },
        ],
    },
    {
        id: 'databases',
        title: 'Databases & Caching',
        skills: [
            { name: 'MongoDB', level: 85 },
            { name: 'PostgreSQL', level: 70 },
            { name: 'Redis', level: 65 },
            { name: 'Elasticsearch', level: 55 },
        ],
    },
    {
        id: 'cloud-devops',
        title: 'Cloud & DevOps',
        skills: [
            { name: 'Docker', level: 75 },
            { name: 'Kubernetes', level: 55 },
            { name: 'AWS', level: 60 },
            { name: 'CI/CD (GitHub Actions)', level: 70 },
            { name: 'Nginx', level: 60 },
        ],
    },
    {
        id: 'ml-ai',
        title: 'AI / Machine Learning',
        skills: [
            { name: 'NLP', level: 70 },
            { name: 'LangChain', level: 65 },
            { name: 'Vector DBs (FAISS/PGVector)', level: 60 },
            { name: 'OpenAI APIs', level: 75 },
            { name: 'Model Serving', level: 55 },
        ],
    },
    {
        id: 'tools',
        title: 'Tools & Practices',
        skills: [
            { name: 'Git & GitHub', level: 90 },
            { name: 'Jest/Testing', level: 65 },
            { name: 'ESLint/Prettier', level: 80 },
            { name: 'Agile/Scrum', level: 70 },
            { name: 'System Design', level: 70 },
        ],
    },
];

const Skills: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            {/* Page Header */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, fontWeight: 'bold' }}
                >
                    <Box component="span" sx={{ color: 'primary.main' }}>#</Box>Skills
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Category-wise overview of my skills and strengths
                </Typography>
            </Box>

            {/* Decorative accent box (desktop) */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    border: '2px solid #C86DD7',
                    top: 100,
                    left: '8%',
                    zIndex: 0,
                    opacity: 0.12,
                    display: { xs: 'none', md: 'block' },
                }}
            />

            {/* Slider of categories (left-aligned with bottom dots) */}
            <Box
                sx={{
                    position: 'relative',
                    // Pagination dots theme
                    '& .swiper-pagination-bullet': {
                        bgcolor: 'rgba(200, 109, 215, 0.3)'
                    },
                    '& .swiper-pagination-bullet-active': {
                        bgcolor: 'primary.main'
                    },
                    // 3D emphasis: active centered card highlighted; sides dulled
                    '& .swiper-slide .MuiCard-root': {
                        opacity: 0.5,
                        transform: 'scale(0.92)',
                        transition: 'opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                    },
                    '& .swiper-slide-prev .MuiCard-root, & .swiper-slide-next .MuiCard-root': {
                        opacity: 0.7,
                        transform: 'scale(0.96)'
                    },
                    '& .swiper-slide-active .MuiCard-root': {
                        opacity: 1,
                        transform: 'scale(1.02)',
                        borderColor: 'primary.main',
                        boxShadow: '0 10px 28px rgba(200, 109, 215, 0.18)'
                    }
                }}
            >
                <Swiper
                    modules={[Pagination, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    centeredSlides
                    loop
                    spaceBetween={16}
                    slidesPerView={1.6}
                    breakpoints={{
                        480: { slidesPerView: 1.7, spaceBetween: 16 },
                        640: { slidesPerView: 1.8, spaceBetween: 18 },
                        900: { slidesPerView: 3, spaceBetween: 24 },
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 140,
                        modifier: 1.2,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    style={{ paddingBottom: 32 }}
                >
                    {SKILL_CATEGORIES.map((cat) => (
                        <SwiperSlide key={cat.id}>
                            <Card
                                sx={{
                                    border: '1px solid #444',
                                    bgcolor: 'background.paper',
                                    width: { xs: '92%', md: '100%' },
                                    mx: 'auto',
                                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow: '0 8px 24px rgba(200, 109, 215, 0.12)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
                                        {cat.title}
                                    </Typography>

                                    <Stack spacing={1.5}>
                                        {cat.skills.map((s) => (
                                            <Box key={s.name} sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                                                    <Chip
                                                        label={s.name}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: 'rgba(200, 109, 215, 0.08)',
                                                            color: 'primary.main',
                                                            border: '1px solid rgba(200, 109, 215, 0.28)',
                                                            fontSize: '0.8rem',
                                                        }}
                                                    />
                                                    {typeof s.level === 'number' && (
                                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                            {s.level}%
                                                        </Typography>
                                                    )}
                                                </Stack>

                                                {typeof s.level === 'number' && (
                                                    <Tooltip title={`${s.name}: ${s.level}%`} placement="top" arrow>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={s.level}
                                                            sx={{
                                                                height: 6,
                                                                borderRadius: 1,
                                                                bgcolor: 'rgba(255,255,255,0.06)',
                                                                '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' },
                                                            }}
                                                        />
                                                    </Tooltip>
                                                )}
                                            </Box>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            {/* Decorative bottom-right square (Desktop only) */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'fixed',
                    bottom: 40,
                    right: 40,
                    width: 100,
                    height: 100,
                    border: '1px solid #444',
                    zIndex: -1,
                }}
            />
        </Container>
    );
};

export default Skills;
