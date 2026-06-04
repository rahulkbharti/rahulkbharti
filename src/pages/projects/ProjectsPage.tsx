import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link as RouterLink } from "react-router-dom";
import {
  PROJECTS,
  PROJECT_CATEGORY_LABELS,
  type ProjectCategory,
} from "../../data/projects";

type ProjectFilter = "all" | ProjectCategory;

const CATEGORY_STYLES: Record<
  ProjectCategory,
  { accent: string; background: string; border: string }
> = {
  backend: {
    accent: "#75bfff",
    background: "rgba(117, 191, 255, 0.1)",
    border: "rgba(117, 191, 255, 0.3)",
  },
  fullstack: {
    accent: "#ffb454",
    background: "rgba(255, 180, 84, 0.1)",
    border: "rgba(255, 180, 84, 0.3)",
  },
  frontend: {
    accent: "#b6a6ff",
    background: "rgba(182, 166, 255, 0.1)",
    border: "rgba(182, 166, 255, 0.3)",
  },
  ai: {
    accent: "#92d36e",
    background: "rgba(146, 211, 110, 0.1)",
    border: "rgba(146, 211, 110, 0.3)",
  },
  realtime: {
    accent: "#ff9778",
    background: "rgba(255, 151, 120, 0.1)",
    border: "rgba(255, 151, 120, 0.3)",
  },
};

const FILTERS: ProjectFilter[] = [
  "all",
  "backend",
  "fullstack",
  "frontend",
  "ai",
  "realtime",
];

const CaseBlock: React.FC<{
  label: string;
  text: string;
  mono?: boolean;
}> = ({ label, text, mono = false }) => (
  <Box
    sx={{
      borderRadius: 2,
      bgcolor: "rgba(255, 255, 255, 0.025)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      px: 1.5,
      py: 1.25,
    }}
  >
    <Typography
      variant="overline"
      sx={{
        display: "block",
        mb: 0.35,
        color: "text.secondary",
        fontSize: "0.64rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        lineHeight: 1.4,
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        fontFamily: mono ? "monospace" : "inherit",
        fontSize: mono ? "0.75rem" : "0.8rem",
        lineHeight: 1.65,
      }}
    >
      {text}
    </Typography>
  </Box>
);

interface ProjectsPageProps {
  embedded?: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ embedded = false }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const visibleProjects = useMemo(
    () =>
      activeFilter === "all"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  return (
    <Container
      id={embedded ? "works" : undefined}
      maxWidth="lg"
      sx={{ py: { xs: 4, md: embedded ? 8 : 10 } }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "2.2rem", md: "2.8rem" }, fontWeight: 700 }}
        >
          Projects
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mt: 2, maxWidth: 820 }}
        >
          A category-wise collection of backend systems, full-stack products,
          real-time experiments, and AI projects. Each card captures the
          problem, solution, architecture, and most useful lessons.
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={0.75}
        useFlexGap
        flexWrap="wrap"
        sx={{ mb: 3 }}
        aria-label="Filter projects by category"
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          const style = filter === "all" ? undefined : CATEGORY_STYLES[filter];
          const label =
            filter === "all"
              ? `All (${PROJECTS.length})`
              : PROJECT_CATEGORY_LABELS[filter];

          return (
            <Button
              key={filter}
              size="small"
              variant="outlined"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter)}
              sx={{
                minHeight: 30,
                borderRadius: 99,
                px: 1.5,
                py: 0.35,
                color: isActive
                  ? style?.accent ?? "primary.main"
                  : "text.secondary",
                bgcolor: isActive
                  ? style?.background ?? "rgba(255, 180, 84, 0.1)"
                  : "transparent",
                borderColor: isActive
                  ? style?.border ?? "rgba(255, 180, 84, 0.35)"
                  : "rgba(255, 255, 255, 0.14)",
                fontSize: "0.72rem",
                textTransform: "none",
                "&:hover": {
                  bgcolor: style?.background ?? "rgba(255, 180, 84, 0.1)",
                  borderColor: style?.border ?? "rgba(255, 180, 84, 0.35)",
                  color: style?.accent ?? "primary.main",
                },
              }}
            >
              {label}
            </Button>
          );
        })}
      </Stack>

      <Box
        aria-live="polite"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: 1.5,
        }}
      >
        {visibleProjects.map((project) => {
          const categoryStyle = CATEGORY_STYLES[project.category];

          return (
            <Card
              key={project.id}
              sx={{
                height: "100%",
                bgcolor: "background.paper",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition:
                  "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: categoryStyle.border,
                  boxShadow: `0 16px 36px ${categoryStyle.background}`,
                },
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                  p: { xs: 2, md: 2.25 },
                  "&:last-child": { pb: { xs: 2, md: 2.25 } },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Typography
                    component={RouterLink}
                    to={`/projects/${project.slug}`}
                    variant="h6"
                    sx={{
                      minWidth: 0,
                      color: categoryStyle.accent,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      overflowWrap: "anywhere",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Chip
                    label={PROJECT_CATEGORY_LABELS[project.category]}
                    size="small"
                    sx={{
                      flexShrink: 0,
                      height: 23,
                      bgcolor: categoryStyle.background,
                      color: categoryStyle.accent,
                      border: `1px solid ${categoryStyle.border}`,
                      fontSize: "0.65rem",
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  {project.overview}
                </Typography>

                <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                  {project.stack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        height: 23,
                        bgcolor: categoryStyle.background,
                        color: categoryStyle.accent,
                        border: `1px solid ${categoryStyle.border}`,
                        fontSize: "0.66rem",
                      }}
                    />
                  ))}
                </Stack>

                <CaseBlock label="Problem" text={project.problem} />
                <CaseBlock label="Solution" text={project.solution} />
                <CaseBlock
                  label="Architecture"
                  text={project.architecture}
                  mono
                />
                <CaseBlock label="Key learnings" text={project.keyLearnings} />

                <Stack
                  direction="row"
                  spacing={0.75}
                  useFlexGap
                  flexWrap="wrap"
                  sx={{ mt: "auto", pt: 0.5 }}
                >
                  <Button
                    component={RouterLink}
                    to={`/projects/${project.slug}`}
                    size="small"
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    sx={{
                      color: categoryStyle.accent,
                      borderColor: categoryStyle.border,
                      bgcolor: categoryStyle.background,
                      fontSize: "0.7rem",
                      textTransform: "none",
                    }}
                  >
                    Case study
                  </Button>
                  {project.githubUrl && (
                    <Button
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      size="small"
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      sx={{
                        color: "text.secondary",
                        borderColor: "rgba(255, 255, 255, 0.14)",
                        fontSize: "0.7rem",
                        textTransform: "none",
                      }}
                    >
                      GitHub
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      size="small"
                      variant="outlined"
                      startIcon={<LaunchIcon />}
                      sx={{
                        color: "text.secondary",
                        borderColor: "rgba(255, 255, 255, 0.14)",
                        fontSize: "0.7rem",
                        textTransform: "none",
                      }}
                    >
                      Live
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default ProjectsPage;
