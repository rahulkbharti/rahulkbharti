import React, { useMemo } from 'react';
import { Container, Box, Typography, Card, CardContent, CardMedia, Chip, Stack, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link as RouterLink } from 'react-router-dom';
import { POSTS } from '../../data/blog';

const getStoredLikes = (postId: string, baseline: number) => {
    const raw = localStorage.getItem(`blog:likes:${postId}`);
    if (!raw) return { liked: false, count: baseline };
    try { return JSON.parse(raw) as { liked: boolean; count: number }; } catch { return { liked: false, count: baseline }; }
};

const BlogList: React.FC = () => {
    const items = useMemo(() => POSTS.slice().sort((a, b) => (a.date < b.date ? 1 : -1)), []);

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            {/* Header */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, fontWeight: 'bold' }}>
                    <Box component="span" sx={{ color: 'primary.main' }}>#</Box>Blog
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Thoughts and notes on engineering
                </Typography>
            </Box>

            <Stack spacing={3}>
                {items.map((post) => {
                    const like = getStoredLikes(post.id, post.likes);
                    return (
                        <Card key={post.id} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, border: '1px solid #444', bgcolor: 'background.paper', overflow: 'hidden' }}>
                            {post.coverImage && (
                                <CardMedia component="img" image={post.coverImage} alt={post.title} sx={{ width: { md: 260 }, height: { xs: 180, md: 'auto' }, objectFit: 'cover' }} />
                            )}
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component={RouterLink} to={`/blog/${post.slug}`} variant="h5" sx={{ color: 'white', textDecoration: 'none', fontWeight: 700, '&:hover': { color: 'primary.main' } }}>
                                    {post.title}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                                    {new Date(post.date).toLocaleDateString()}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                                    {post.tags.map((t) => (
                                        <Chip key={t} label={t} size="small" sx={{ bgcolor: 'rgba(200, 109, 215, 0.08)', color: 'primary.main', border: '1px solid rgba(200, 109, 215, 0.28)' }} />
                                    ))}
                                </Stack>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
                                    {post.excerpt}
                                </Typography>

                                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                    <Button component={RouterLink} to={`/blog/${post.slug}`} variant="outlined" size="small">
                                        Read more
                                    </Button>
                                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                                        {like.liked ? <FavoriteIcon sx={{ color: 'primary.main', fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                                        <Typography variant="caption">{like.count}</Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Container>
    );
};

export default BlogList;
