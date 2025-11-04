import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Stack,
    Alert,
    Snackbar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to a backend or email service
        console.log('Form submitted:', formData);
        setShowSuccess(true);
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleCloseSnackbar = () => {
        setShowSuccess(false);
    };

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }} id="contact">
            {/* Page Header */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, fontWeight: 'bold' }}
                >
                    <Box component="span" sx={{ color: 'primary.main' }}>#</Box>Contact
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Get in touch with me
                </Typography>
            </Box>

            {/* Decorative accent box (desktop) */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    border: '2px solid #C86DD7',
                    top: 120,
                    right: '10%',
                    zIndex: 0,
                    opacity: 0.12,
                    display: { xs: 'none', md: 'block' },
                }}
            />

            <Grid container spacing={4}>
                {/* Contact Form */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            p: 4,
                            border: '1px solid #444',
                            bgcolor: 'background.paper',
                            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                            '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: '0 8px 24px rgba(200, 109, 215, 0.12)',
                            },
                        }}
                    >
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                required
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#444' },
                                        '&:hover fieldset': { borderColor: '#666' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                                }}
                            />

                            <TextField
                                fullWidth
                                required
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#444' },
                                        '&:hover fieldset': { borderColor: '#666' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                                }}
                            />

                            <TextField
                                fullWidth
                                required
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#444' },
                                        '&:hover fieldset': { borderColor: '#666' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                                }}
                            />

                            <TextField
                                fullWidth
                                required
                                label="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                multiline
                                rows={6}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#444' },
                                        '&:hover fieldset': { borderColor: '#666' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<SendIcon />}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                        boxShadow: '0 4px 12px rgba(200, 109, 215, 0.3)',
                                    },
                                }}
                            >
                                Send Message
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Contact Information */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Stack spacing={3}>
                        {/* Contact Details Card */}
                        <Paper
                            sx={{
                                p: 3,
                                border: '1px solid #444',
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
                                Contact Information
                            </Typography>

                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <EmailIcon sx={{ color: 'primary.main' }} />
                                    <Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                            Email
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="a"
                                            href="mailto:rahul.kbharti2002@gmail.com"
                                            sx={{
                                                color: 'white',
                                                textDecoration: 'none',
                                                '&:hover': { color: 'primary.main' },
                                            }}
                                        >
                                            rahul.kbharti2002@gmail.com
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Paper>

                        {/* Social Links Card */}
                        <Paper
                            sx={{
                                p: 3,
                                border: '1px solid #444',
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
                                Find Me On
                            </Typography>

                            <Stack spacing={2}>
                                <Box
                                    component="a"
                                    href="https://github.com/rahulkbharti"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        color: 'white',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease',
                                        '&:hover': { color: 'primary.main' },
                                    }}
                                >
                                    <GitHubIcon sx={{ color: 'primary.main' }} />
                                    <Typography variant="body1">GitHub</Typography>
                                </Box>

                                <Box
                                    component="a"
                                    href="https://www.linkedin.com/in/rahul-kbharti"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        color: 'white',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease',
                                        '&:hover': { color: 'primary.main' },
                                    }}
                                >
                                    <LinkedInIcon sx={{ color: 'primary.main' }} />
                                    <Typography variant="body1">LinkedIn</Typography>
                                </Box>
                            </Stack>
                        </Paper>

                        {/* Quick Note */}
                        <Paper
                            sx={{
                                p: 3,
                                border: '1px solid rgba(200, 109, 215, 0.3)',
                                bgcolor: 'rgba(200, 109, 215, 0.05)',
                            }}
                        >
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                💡 I typically respond within 24-48 hours. Looking forward to connecting with you!
                            </Typography>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Message sent successfully! I'll get back to you soon.
                </Alert>
            </Snackbar>

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

export default Contact;
