import cppBootcamp from '../assets/certificates/cpp-bootcamp.png';
import districtLevelCompetition from '../assets/certificates/district-level-compition.png';
import javaBootcamp from '../assets/certificates/java-bootcamp.png';
import nlpDevelopers from '../assets/certificates/nlp-developers.png';
import nlpFoundation from '../assets/certificates/nlp-foundation.png';
import nlpInfosys from '../assets/certificates/nlp-infosys.png';
import reactCertification from '../assets/certificates/react-cerfication.png';
import schoolLevelCompetition from '../assets/certificates/school-level-compition.png';
import tcsCodevitaS12 from '../assets/certificates/tsc-codevita-s12.png';

export type CertificationCategory = 'Cloud & AI' | 'Backend' | 'Data' | 'DevOps' | 'Frontend' | 'Programming';

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    issued: string;
    category: CertificationCategory;
    summary: string;
    skills: string[];
    imageUrl?: string;
    imageAlt?: string;
    featured?: boolean;
    credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
    {
        id: 'tcs-codevita-s12',
        title: 'TCS CodeVita Season 12',
        issuer: 'TCS',
        issued: '2024',
        category: 'Programming',
        summary: 'Competitive programming achievement in TCS CodeVita Season 12.',
        skills: ['Competitive programming', 'Problem solving', 'Algorithms'],
        imageUrl: tcsCodevitaS12,
        imageAlt: 'TCS CodeVita Season 12 certificate',
        featured: true,
    },
    {
        id: 'react-certification',
        title: 'React Certification',
        issuer: 'React Training Program',
        issued: '2024',
        category: 'Frontend',
        summary: 'React certification focused on building modern component-based user interfaces.',
        skills: ['React', 'JavaScript', 'Frontend development'],
        imageUrl: reactCertification,
        imageAlt: 'React certification certificate',
        featured: true,
    },
    {
        id: 'nlp-infosys',
        title: 'Natural Language Processing',
        issuer: 'Infosys',
        issued: '2024',
        category: 'Cloud & AI',
        summary: 'NLP certification covering language processing concepts and applied AI foundations.',
        skills: ['NLP', 'AI', 'Machine learning'],
        imageUrl: nlpInfosys,
        imageAlt: 'Infosys natural language processing certificate',
        featured: true,
    },
    {
        id: 'nlp-foundation',
        title: 'NLP Foundation',
        issuer: 'Infosys',
        issued: '2024',
        category: 'Cloud & AI',
        summary: 'Foundation-level NLP learning credential.',
        skills: ['NLP', 'Text processing', 'AI foundations'],
        imageUrl: nlpFoundation,
        imageAlt: 'NLP foundation certificate',
    },
    {
        id: 'nlp-developers',
        title: 'NLP for Developers',
        issuer: 'Infosys',
        issued: '2024',
        category: 'Cloud & AI',
        summary: 'Developer-focused credential for NLP implementation concepts.',
        skills: ['NLP', 'Developer workflows', 'AI'],
        imageUrl: nlpDevelopers,
        imageAlt: 'NLP for developers certificate',
    },
    {
        id: 'java-bootcamp',
        title: 'Java Bootcamp',
        issuer: 'Bootcamp Program',
        issued: '2024',
        category: 'Programming',
        summary: 'Java bootcamp completion certificate.',
        skills: ['Java', 'OOP', 'Programming'],
        imageUrl: javaBootcamp,
        imageAlt: 'Java bootcamp certificate',
    },
    {
        id: 'cpp-bootcamp',
        title: 'C++ Bootcamp',
        issuer: 'Bootcamp Program',
        issued: '2024',
        category: 'Programming',
        summary: 'C++ bootcamp completion certificate.',
        skills: ['C++', 'Programming', 'Problem solving'],
        imageUrl: cppBootcamp,
        imageAlt: 'C++ bootcamp certificate',
    },
    {
        id: 'district-level-competition',
        title: 'District Level Competition',
        issuer: 'Competition Program',
        issued: '2024',
        category: 'Programming',
        summary: 'District-level competition certificate.',
        skills: ['Competition', 'Problem solving'],
        imageUrl: districtLevelCompetition,
        imageAlt: 'District level competition certificate',
    },
    {
        id: 'school-level-competition',
        title: 'School Level Competition',
        issuer: 'Competition Program',
        issued: '2024',
        category: 'Programming',
        summary: 'School-level competition certificate.',
        skills: ['Competition', 'Problem solving'],
        imageUrl: schoolLevelCompetition,
        imageAlt: 'School level competition certificate',
    },
];

export const FEATURED_CERTIFICATIONS = CERTIFICATIONS.filter((certification) => certification.featured);
