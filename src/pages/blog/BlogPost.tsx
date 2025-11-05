import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Chip,
    Stack,
    Button,
    Card,
    CardMedia,
    TextField,
    Paper,
    Divider
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { POSTS, type Post } from '../../data/blog';
import BlogBackprop from '../../data/Backpropagation';

interface CommentItem {
    id: string;
    name: string;
    message: string;
    createdAt: string; // ISO
}

const useLikes = (post: Post | undefined) => {
    const key = post ? `blog:likes:${post.id}` : '';
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(post?.likes ?? 0);

    useEffect(() => {
        if (!post) return;
        const raw = localStorage.getItem(key);
        if (raw) {
            try {
                const parsed = JSON.parse(raw) as { liked: boolean; count: number };
                setLiked(parsed.liked);
                setCount(parsed.count);
                return;
            } catch { }
        }
        // initialize from baseline
        localStorage.setItem(key, JSON.stringify({ liked: false, count: post.likes }));
        setLiked(false);
        setCount(post.likes);
    }, [key, post]);

    const toggle = () => {
        if (!post) return;
        const nextLiked = !liked;
        const nextCount = count + (nextLiked ? 1 : -1);
        setLiked(nextLiked);
        setCount(nextCount);
        localStorage.setItem(key, JSON.stringify({ liked: nextLiked, count: nextCount }));
    };

    return { liked, count, toggle };
};

const useComments = (post: Post | undefined) => {
    const key = post ? `blog:comments:${post.id}` : '';
    const [items, setItems] = useState<CommentItem[]>([]);

    useEffect(() => {
        if (!post) return;
        const raw = localStorage.getItem(key);
        if (raw) {
            try { setItems(JSON.parse(raw) as CommentItem[]); return; } catch { }
        }
        setItems([]);
    }, [key, post]);

    const add = (name: string, message: string) => {
        if (!post) return;
        const newItem: CommentItem = {
            id: Math.random().toString(36).slice(2),
            name: name || 'Anonymous',
            message,
            createdAt: new Date().toISOString(),
        };
        const next = [newItem, ...items];
        setItems(next);
        localStorage.setItem(key, JSON.stringify(next));
    };

    return { items, add };
};

const BlogPost: React.FC = () => {
    const { slug = '' } = useParams();
    const post = useMemo(() => POSTS.find((p) => p.slug === slug), [slug]);
    const { liked, count, toggle } = useLikes(post);
    const { items: comments, add } = useComments(post);

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    if (!post) {
        return (
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>Post not found</Typography>
                <Button component={RouterLink} to="/" variant="outlined" startIcon={<ArrowBackIcon />}>Back to blog</Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Button component={RouterLink} to="/" variant="outlined" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
                Back to blog
            </Button>

            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'white' }}>{post.title}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{new Date(post.date).toLocaleDateString()}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                    {post.tags.map((t) => (
                        <Chip key={t} label={t} size="small" sx={{ bgcolor: 'rgba(200, 109, 215, 0.08)', color: 'primary.main', border: '1px solid rgba(200, 109, 215, 0.28)' }} />
                    ))}
                </Stack>
            </Box>

            {post.coverImage && (
                <Card sx={{ mb: 3, border: '1px solid #444', bgcolor: 'background.paper' }}>
                    <CardMedia component="img" image={post.coverImage} alt={post.title} sx={{ maxHeight: 420, objectFit: 'cover' }} />
                </Card>
            )}

            {/* Content */}
            <BlogBackprop />

            {/* Likes */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3 }}>
                <Button variant={liked ? 'contained' : 'outlined'} onClick={toggle} startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    sx={{
                        ...(liked ? { bgcolor: 'primary.main', color: 'white' } : {}),
                    }}
                >
                    {liked ? 'Liked' : 'Like'}
                </Button>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{count} {count === 1 ? 'like' : 'likes'}</Typography>
            </Stack>

            {/* Comments */}
            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>Comments</Typography>

                <Paper sx={{ p: 2, border: '1px solid #444', bgcolor: 'background.paper', mb: 2 }}>
                    <Stack spacing={2}>
                        <TextField
                            label="Name (optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#444' } }}
                        />
                        <TextField
                            label="Write a comment"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            variant="outlined"
                            multiline
                            minRows={3}
                            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#444' } }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => { if (message.trim()) { add(name.trim(), message.trim()); setMessage(''); } }}
                            disabled={!message.trim()}
                        >
                            Post Comment
                        </Button>
                    </Stack>
                </Paper>

                <Stack spacing={2}>
                    {comments.length === 0 ? (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Be the first to comment.</Typography>
                    ) : (
                        comments.map((c) => (
                            <Paper key={c.id} sx={{ p: 2, border: '1px solid #444', bgcolor: 'background.paper' }}>
                                <Stack spacing={0.5}>
                                    <Typography variant="subtitle2" sx={{ color: 'white' }}>{c.name}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{new Date(c.createdAt).toLocaleString()}</Typography>
                                    <Divider sx={{ my: 1, borderColor: '#333' }} />
                                    <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>{c.message}</Typography>
                                </Stack>
                            </Paper>
                        ))
                    )}
                </Stack>
            </Box>
        </Container>
    );
};

export default BlogPost;
