import React, { useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import { PROJECTS, PROJECT_CATEGORY_LABELS } from "../../data/projects";

const DetailSection: React.FC<{
  title: string;
  text: string;
  mono?: boolean;
}> = ({ title, text, mono = false }) => (
  <Card
    sx={{
      height: "100%",
      bgcolor: "background.paper",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      p: { xs: 2.5, md: 3 },
    }}
  >
    <Typography
      variant="overline"
      sx={{
        color: "primary.main",
        fontWeight: 700,
        letterSpacing: "0.08em",
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: "text.secondary",
        mt: 1,
        lineHeight: 1.75,
        fontFamily: mono ? "monospace" : "inherit",
        fontSize: mono ? "0.88rem" : undefined,
      }}
    >
      {text}
    </Typography>
  </Card>
);

const ProjectDetail: React.FC = () => {
  const { slug = "" } = useParams();
  const project = useMemo(
    () => PROJECTS.find((item) => item.slug === slug),
    [slug],
  );

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography variant="h4" sx={{ color: "white", mb: 2 }}>
          Project not found
        </Typography>
        <Button
          component={RouterLink}
          to="/projects"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back to projects
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Button
        component={RouterLink}
        to="/projects"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to projects
      </Button>

      <Box sx={{ mb: 3 }}>
        <Chip
          label={PROJECT_CATEGORY_LABELS[project.category]}
          size="small"
          sx={{
            mb: 1.5,
            bgcolor: "rgba(73, 242, 165, 0.08)",
            color: "primary.main",
            border: "1px solid rgba(73, 242, 165, 0.3)",
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 800,
            color: "white",
            overflowWrap: "anywhere",
          }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mt: 1, maxWidth: 820, lineHeight: 1.7 }}
        >
          {project.overview}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
        {project.stack.map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            sx={{
              bgcolor: "rgba(73, 242, 165, 0.08)",
              color: "primary.main",
              border: "1px solid rgba(73, 242, 165, 0.3)",
            }}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 4 }}>
        {project.githubUrl && (
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            sx={{
              borderColor: "rgba(255, 255, 255, 0.18)",
              color: "text.secondary",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                bgcolor: "rgba(73, 242, 165, 0.08)",
              },
            }}
          >
            GitHub
          </Button>
        )}
        {project.liveUrl && (
          <Button
            variant="outlined"
            startIcon={<LaunchIcon />}
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": { bgcolor: "rgba(73, 242, 165, 0.1)" },
            }}
          >
            Live demo
          </Button>
        )}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        <DetailSection title="Problem" text={project.problem} />
        <DetailSection title="Solution" text={project.solution} />
        <DetailSection
          title="Architecture"
          text={project.architecture}
          mono
        />
        <DetailSection title="Key learnings" text={project.keyLearnings} />
      </Box>
    </Container>
  );
};

export default ProjectDetail;
