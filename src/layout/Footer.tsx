import React from "react";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const QUICK_LINKS = [
  { href: "/rahulkbharti/about", label: "about" },
  { href: "/rahulkbharti", label: "home" },
  { href: "/rahulkbharti/skills", label: "skills" },
  { href: "/rahulkbharti/projects", label: "projects" },
];

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      borderTop: "1px solid rgba(87, 199, 255, 0.13)",
      py: 4,
      mt: "auto",
      bgcolor: "rgba(5, 8, 13, 0.92)",
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              rahul<Box component="span" sx={{ color: "text.secondary" }}>@</Box>
              <Box component="span" sx={{ color: "primary.main" }}>backend</Box>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mt: 0.5,
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "0.7rem",
              }}
            >
              backend.engineer / saas / platform / ai
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://github.com/rahulkbharti"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/rahul-kbharti"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="mailto:rahul.kbharti2002@gmail.com"
              sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "rgba(87, 199, 255, 0.11)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: "0.7rem",
            }}
          >
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                bgcolor: "primary.main",
                boxShadow: "0 0 10px rgba(73, 242, 165, 0.7)",
              }}
            />
            © {new Date().getFullYear()} rahul@backend:~$
          </Typography>

          <Stack direction="row" spacing={{ xs: 2, sm: 3 }} flexWrap="wrap" useFlexGap>
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: "0.7rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                ./{item.label}
              </Link>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
