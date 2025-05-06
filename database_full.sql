--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-05-06 14:25:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 16506)
-- Name: attendance_dataset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance_dataset (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    work_date date NOT NULL,
    hours_worked integer,
    present boolean
);


ALTER TABLE public.attendance_dataset OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16505)
-- Name: attendance_dataset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attendance_dataset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attendance_dataset_id_seq OWNER TO postgres;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 235
-- Name: attendance_dataset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attendance_dataset_id_seq OWNED BY public.attendance_dataset.id;


--
-- TOC entry 230 (class 1259 OID 16458)
-- Name: books_dataset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books_dataset (
    id integer NOT NULL,
    title text NOT NULL,
    author text NOT NULL,
    year integer NOT NULL,
    created_at date NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE public.books_dataset OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16457)
-- Name: books_dataset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_dataset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_dataset_id_seq OWNER TO postgres;

--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 229
-- Name: books_dataset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_dataset_id_seq OWNED BY public.books_dataset.id;


--
-- TOC entry 228 (class 1259 OID 16449)
-- Name: employees_dataset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees_dataset (
    id integer NOT NULL,
    name text NOT NULL,
    department text NOT NULL,
    salary integer NOT NULL,
    created_at date NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE public.employees_dataset OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16448)
-- Name: employees_dataset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_dataset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_dataset_id_seq OWNER TO postgres;

--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 227
-- Name: employees_dataset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_dataset_id_seq OWNED BY public.employees_dataset.id;


--
-- TOC entry 232 (class 1259 OID 16467)
-- Name: exams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exams (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    created_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.exams OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16466)
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exams_id_seq OWNER TO postgres;

--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 231
-- Name: exams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exams_id_seq OWNED BY public.exams.id;


--
-- TOC entry 234 (class 1259 OID 16494)
-- Name: grades_dataset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grades_dataset (
    id integer NOT NULL,
    student_id integer NOT NULL,
    subject character varying(50),
    grade integer,
    grade_date date
);


ALTER TABLE public.grades_dataset OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16493)
-- Name: grades_dataset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grades_dataset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grades_dataset_id_seq OWNER TO postgres;

--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 233
-- Name: grades_dataset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grades_dataset_id_seq OWNED BY public.grades_dataset.id;


--
-- TOC entry 224 (class 1259 OID 16420)
-- Name: solutions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solutions (
    id integer NOT NULL,
    user_id integer,
    task_id integer,
    sql_query text NOT NULL,
    submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_correct boolean
);


ALTER TABLE public.solutions OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16419)
-- Name: solutions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solutions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solutions_id_seq OWNER TO postgres;

--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 223
-- Name: solutions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solutions_id_seq OWNED BY public.solutions.id;


--
-- TOC entry 218 (class 1259 OID 16386)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100),
    age bigint
);


ALTER TABLE public.students OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16440)
-- Name: students_dataset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students_dataset (
    id integer NOT NULL,
    name text NOT NULL,
    grade integer NOT NULL,
    created_at date NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE public.students_dataset OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16439)
-- Name: students_dataset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_dataset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.students_dataset_id_seq OWNER TO postgres;

--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 225
-- Name: students_dataset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_dataset_id_seq OWNED BY public.students_dataset.id;


--
-- TOC entry 217 (class 1259 OID 16385)
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.students_id_seq OWNER TO postgres;

--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 217
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- TOC entry 222 (class 1259 OID 16405)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    created_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    solution_query text,
    dataset_name text,
    exam_id integer,
    dataset_name_2 character varying(50)
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16404)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 221
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 220 (class 1259 OID 16393)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    role character varying(10) NOT NULL,
    name character varying(100),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['teacher'::character varying, 'student'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16392)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4698 (class 2604 OID 16509)
-- Name: attendance_dataset id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_dataset ALTER COLUMN id SET DEFAULT nextval('public.attendance_dataset_id_seq'::regclass);


--
-- TOC entry 4694 (class 2604 OID 16461)
-- Name: books_dataset id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_dataset ALTER COLUMN id SET DEFAULT nextval('public.books_dataset_id_seq'::regclass);


--
-- TOC entry 4693 (class 2604 OID 16452)
-- Name: employees_dataset id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees_dataset ALTER COLUMN id SET DEFAULT nextval('public.employees_dataset_id_seq'::regclass);


--
-- TOC entry 4695 (class 2604 OID 16470)
-- Name: exams id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams ALTER COLUMN id SET DEFAULT nextval('public.exams_id_seq'::regclass);


--
-- TOC entry 4697 (class 2604 OID 16497)
-- Name: grades_dataset id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades_dataset ALTER COLUMN id SET DEFAULT nextval('public.grades_dataset_id_seq'::regclass);


--
-- TOC entry 4690 (class 2604 OID 16423)
-- Name: solutions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solutions ALTER COLUMN id SET DEFAULT nextval('public.solutions_id_seq'::regclass);


--
-- TOC entry 4686 (class 2604 OID 16389)
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- TOC entry 4692 (class 2604 OID 16443)
-- Name: students_dataset id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students_dataset ALTER COLUMN id SET DEFAULT nextval('public.students_dataset_id_seq'::regclass);


--
-- TOC entry 4688 (class 2604 OID 16408)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 4687 (class 2604 OID 16396)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4893 (class 0 OID 16506)
-- Dependencies: 236
-- Data for Name: attendance_dataset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance_dataset (id, employee_id, work_date, hours_worked, present) FROM stdin;
1	1	2024-04-15	8	t
2	1	2024-04-16	0	f
3	2	2024-04-15	9	t
4	2	2024-04-16	8	t
5	3	2024-04-15	0	f
6	4	2024-04-15	8	t
7	4	2024-04-16	8	t
8	5	2024-04-15	7	t
9	5	2024-04-16	6	t
\.


--
-- TOC entry 4887 (class 0 OID 16458)
-- Dependencies: 230
-- Data for Name: books_dataset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books_dataset (id, title, author, year, created_at, active) FROM stdin;
1	Az ember tragédiája	Madách Imre	1861	1861-01-01	t
2	Egri csillagok	Gárdonyi Géza	1899	1899-05-10	t
3	Tüskevár	Fekete István	1957	1957-03-15	t
4	Pál utcai fiúk	Molnár Ferenc	1907	1907-08-20	f
5	A kőszívű ember fiai	Jókai Mór	1869	1869-09-01	t
\.


--
-- TOC entry 4885 (class 0 OID 16449)
-- Dependencies: 228
-- Data for Name: employees_dataset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees_dataset (id, name, department, salary, created_at, active) FROM stdin;
1	János	HR	450000	2019-03-01	t
2	Zita	IT	700000	2020-07-15	t
3	Laci	Sales	550000	2018-02-20	f
4	Péter	IT	480000	2021-01-10	t
5	Emese	Marketing	600000	2020-05-05	t
\.


--
-- TOC entry 4889 (class 0 OID 16467)
-- Dependencies: 232
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exams (id, title, description, created_by, created_at) FROM stdin;
1	SQL ZH #1	Első SQL dolgozat - 5 feladattal	11	2025-03-29 20:06:12.542544
2	SQL	Kezdo szint	11	2025-03-30 12:18:19.075161
3	SQL 2	Számonkérés 12C	11	2025-03-30 19:56:34.053513
4	SQL3	Ez ok.	11	2025-03-31 09:23:33.718349
5	SQL4	doga 4	11	2025-03-31 12:04:21.11893
6	SQL6	Dolgozat6	11	2025-03-31 19:41:31.531476
7	SQL8	Dolgozat	14	2025-04-01 13:57:06.89957
8	SQL10	proba10	14	2025-04-01 14:33:47.168275
9	SQL12	12A	16	2025-04-01 15:16:00.161251
10	SQL dolgozat 100	Sql feladatok megoldása	19	2025-04-23 15:01:46.851104
11	SQL dolgozat 101	11c	19	2025-04-23 17:34:21.928219
12	Temazaro dolgozat SQL	Ev vegi temazaro dolgozat SQL lekerdezesekbol	22	2025-04-27 15:07:42.369475
\.


--
-- TOC entry 4891 (class 0 OID 16494)
-- Dependencies: 234
-- Data for Name: grades_dataset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grades_dataset (id, student_id, subject, grade, grade_date) FROM stdin;
1	1	Matematika	4	2024-04-01
2	1	Fizika	5	2024-04-10
3	2	Matematika	3	2024-04-05
4	3	Történelem	5	2024-04-07
5	4	Kémia	2	2024-04-08
6	5	Biológia	4	2024-04-09
7	3	Fizika	3	2024-04-12
\.


--
-- TOC entry 4881 (class 0 OID 16420)
-- Dependencies: 224
-- Data for Name: solutions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solutions (id, user_id, task_id, sql_query, submitted_at, is_correct) FROM stdin;
1	8	1	SELECT * FROM students WHERE grade > 4;	2025-03-24 20:24:11.606704	\N
2	8	5	select * from users	2025-03-24 20:39:41.339984	\N
3	9	5	select	2025-03-24 20:54:30.054194	\N
4	12	6	megoldás	2025-03-26 20:03:56.036851	\N
5	12	7	nyasgem	2025-03-27 19:56:25.336921	\N
6	12	8	select * from users	2025-03-27 20:20:19.980798	\N
7	12	10	SELECT * FROM students;	2025-03-27 20:38:13.133542	t
8	12	11	SELECT * FROM students	2025-03-29 12:59:04.892987	t
9	12	13	SELECT * FROM students	2025-03-29 14:15:51.567213	t
10	12	14	SELECT * FROM students	2025-03-29 15:46:58.521209	t
11	12	15	SELECT * FROM students	2025-03-29 16:46:09.938763	t
12	12	15	SELECT * FROM students	2025-03-29 16:46:32.539556	t
13	12	15	SELECT * FROM students	2025-03-29 16:48:13.757654	t
14	12	19	SELECT * FROM students	2025-03-30 12:25:14.326754	t
15	12	19	SELECT * FROM students	2025-03-30 18:01:23.208024	t
16	12	19	SELECT * FROM students	2025-03-30 18:31:04.580482	t
17	12	19	SELECT * FROM students	2025-03-30 18:31:15.051895	t
18	12	19	SELECT * FROM students	2025-03-30 18:36:02.119133	t
19	12	19	SELECT * FROM students	2025-03-30 18:36:08.303609	t
20	12	19	SELECT * FROM students	2025-03-30 18:36:57.442463	t
21	12	19	SELECT * FROM students	2025-03-30 18:37:03.53994	t
22	12	19	SELECT * FROM students	2025-03-30 18:37:04.421247	t
23	12	19	SELECT * FROM students	2025-03-30 18:39:50.216297	t
24	12	19	SELECT * FROM students	2025-03-30 18:39:51.622372	t
25	12	19	SELECT * FROM students	2025-03-30 18:39:51.954036	t
26	12	19	SELECT * FROM students	2025-03-30 18:39:52.256991	t
27	12	19	SELECT * FROM students	2025-03-30 18:41:53.204926	t
28	12	19	SELECT * FROM students	2025-03-30 18:49:11.064745	t
29	12	19	SELECT * FROM students	2025-03-30 19:44:00.644728	t
30	12	19	SELECT * FROM students	2025-03-30 19:45:47.765311	t
31	12	19	SELECT * FROM students	2025-03-30 19:55:14.043491	t
32	12	19	SELECT * FROM students	2025-03-30 19:55:28.969016	t
33	12	20	SELECT * FROM students	2025-03-30 19:59:31.91257	t
34	12	21	SELECT * FROM students	2025-03-30 19:59:40.092758	t
35	12	22	SELECT * FROM students	2025-03-30 19:59:46.296748	t
36	12	20	SELECT * FROM students	2025-03-30 20:10:14.197051	t
37	12	21	SELECT	2025-03-30 20:10:23.48199	f
38	12	22	SELECT * FROM students	2025-03-30 20:10:36.731624	t
39	12	20	SELECT * FROM students	2025-03-30 20:45:41.795908	t
40	12	21	SELECT * FROM students	2025-03-30 20:45:47.208893	t
41	12	22	SELECT * FROM students	2025-03-30 20:45:52.617085	t
42	12	20	SELECT * FROM students	2025-03-30 20:53:17.806405	t
43	12	21	Select	2025-03-30 20:53:25.565255	f
44	12	22	Select	2025-03-30 20:53:53.643687	f
45	12	20	SELECT * FROM students	2025-03-31 09:37:25.631115	t
46	12	20	SELECT * FROM students	2025-03-31 09:37:28.80503	t
47	12	20	SELECT * FROM students	2025-03-31 09:37:29.998735	t
48	12	23	SELECT * FROM students	2025-03-31 10:29:17.336292	\N
49	12	24	select	2025-03-31 10:29:28.433608	\N
50	12	25	select	2025-03-31 10:29:40.118141	\N
51	12	23	select	2025-03-31 10:32:30.91101	\N
52	12	24	Select 	2025-03-31 10:33:45.537249	\N
53	12	25	se	2025-03-31 10:34:00.722779	\N
54	12	26	SELECT * FROM students	2025-03-31 12:05:50.384015	\N
55	12	27	Select	2025-03-31 12:06:00.943113	\N
56	13	26	SE	2025-03-31 12:27:37.881082	\N
57	13	27	SO	2025-03-31 12:27:47.865051	\N
58	12	26	se	2025-03-31 12:59:23.141863	\N
59	12	26	se	2025-03-31 13:00:34.298194	\N
60	12	26	se	2025-03-31 13:00:43.208581	\N
61	12	26	se	2025-03-31 13:09:40.974394	\N
62	12	28	SELECT * FROM students_dataset	2025-03-31 19:44:18.973331	\N
63	12	29	SELECT * FROM students_dataset	2025-03-31 19:44:23.084694	\N
64	12	28	SELECT * FROM students_dataset	2025-03-31 20:03:40.022535	t
65	12	29	SELECT * FROM students_dataset	2025-03-31 20:03:47.534751	t
66	15	30	SELECT * FROM students_dataset	2025-04-01 13:59:22.620429	t
67	15	30	select	2025-04-01 14:15:48.938627	\N
68	12	30	select * from students_dataset	2025-04-01 14:18:54.273025	\N
69	12	30	SELECT * FROM students_dataset	2025-04-01 14:20:46.365807	\N
70	15	30	SELECT * FROM students_dataset	2025-04-01 14:31:45.93803	\N
71	15	31	select * from students_dataset	2025-04-01 14:35:55.27589	\N
72	12	31	select * from students_dataset	2025-04-01 14:43:31.39829	t
73	17	32	select name from students_dataset	2025-04-01 15:18:03.196699	f
74	20	33	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n  grades_dataset.grade,\n  grades_dataset.grade_date\nFROM \n  students_dataset\nJOIN \n  grades_dataset\nON \n  students_dataset.id = grades_dataset.student_id;	2025-04-23 15:10:15.770292	t
75	20	33	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n	2025-04-23 15:10:39.996584	\N
76	20	33	Select *	2025-04-23 15:11:39.440237	\N
77	20	33	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n  grades_dataset.grade,\n  grades_dataset.grade_date\nFROM \n  students_dataset\nJOIN \n  grades_dataset\nON \n  students_dataset.id = grades_dataset.student_id;	2025-04-23 15:12:26.501111	t
78	20	33	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n  grades_dataset.grade,\n  grades_dataset.grade_date\nFROM \n  students_dataset\nJOIN 	2025-04-23 15:13:21.828564	\N
79	20	33	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n  grades_dataset.grade,\n  grades_dataset.grade_date\nFROM \n  students_dataset\nJOIN 	2025-04-23 15:34:31.468598	\N
80	20	33	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n  grades_dataset.grade,\n  grades_dataset.grade_date\nFROM \n  students_dataset\nJOIN 	2025-04-23 15:34:32.667187	\N
81	20	33	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n  grades_dataset.grade,\n  grades_dataset.grade_date\nFROM \n  students_dataset\nJOIN \n  grades_dataset\nON \n  students_dataset.id = grades_dataset.student_id;	2025-04-23 15:49:49.177862	t
82	20	33	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n  grades_dataset.grade,\n  grades_dataset.grade_date\nFROM \n  students_dataset\nJOIN \n  grades_dataset\nON \n  students_dataset.id = grades_dataset.student_id;	2025-04-23 17:25:43.69576	t
83	20	34	select student_id,avg(grade) from \ngrades_dataset\nwhere 1=1\ngroup by student_id;	2025-04-23 17:36:47.141058	t
84	20	35	s	2025-04-24 11:59:19.463455	\N
85	20	35	Select * from attendance_dataset;	2025-04-24 11:59:50.281441	t
86	20	36	ss	2025-04-24 12:51:00.957798	\N
87	20	36	select * from students_dataset	2025-04-24 12:51:18.425255	t
88	23	35	Select * From attendance_dataset	2025-04-27 15:04:04.576126	t
89	23	34	ss	2025-04-27 15:05:11.891744	\N
90	23	35	Select * From attendance_dataset	2025-04-27 15:05:29.472507	t
91	23	36	ff	2025-04-27 15:05:36.30589	\N
92	23	36	Select	2025-04-27 15:05:41.476962	f
93	23	37	Select * From students_dataset;	2025-04-27 15:23:57.813649	t
94	23	38	SELECT \n  students_dataset.name AS student_name,\n  grades_dataset.subject,\n  grades_dataset.grade\nFROM \n  students_dataset\nJOIN \n  grades_dataset\nON \n  students_dataset.id = grades_dataset.student_id\nWHERE \n  grades_dataset.subject = 'Matematika';	2025-04-27 15:24:30.449386	t
95	12	37	Select *	2025-04-27 15:29:04.466226	\N
96	12	38	selecct * 	2025-04-27 15:29:18.48202	\N
\.


--
-- TOC entry 4875 (class 0 OID 16386)
-- Dependencies: 218
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, name, email, age) FROM stdin;
1	hfd	drg	12
\.


--
-- TOC entry 4883 (class 0 OID 16440)
-- Dependencies: 226
-- Data for Name: students_dataset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students_dataset (id, name, grade, created_at, active) FROM stdin;
1	Ákos	5	2023-09-01	t
2	Petra	4	2023-09-01	t
3	Zoli	3	2022-09-01	f
4	Eszter	5	2023-01-15	t
5	Gergő	2	2021-09-01	f
\.


--
-- TOC entry 4879 (class 0 OID 16405)
-- Dependencies: 222
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, title, description, created_by, created_at, solution_query, dataset_name, exam_id, dataset_name_2) FROM stdin;
1	Listázd ki az összes diákot!	Használd a SELECT * FROM students lekérdezést.	5	2025-03-23 16:17:32.976221	\N	\N	\N	\N
2	fff	ddd	3	2025-03-23 17:44:56.61003	\N	\N	\N	\N
3	valami	valami	3	2025-03-23 18:00:34.740829	\N	\N	\N	\N
4	semmi	semmi	3	2025-03-23 18:13:10.270614	\N	\N	\N	\N
5	ennyi	annyi	6	2025-03-23 21:09:16.206713	\N	\N	\N	\N
6	Lekérdezés	Feladat 1 	11	2025-03-26 20:02:11.835971	\N	\N	\N	\N
7	Dolgozat	Írasd ki a neveket	11	2025-03-27 19:55:29.796134	\N	\N	\N	\N
8	Dolgozat2	SQL	11	2025-03-27 20:19:49.062524	\N	\N	\N	\N
9	dolgozat3	SQL	11	2025-03-27 20:25:18.392394	\N	\N	\N	\N
10	dolgozat4	SQL	11	2025-03-27 20:36:48.16624	SELECT * FROM students;	\N	\N	\N
11	ötösért	Csináld meg a feladatot	11	2025-03-29 12:58:43.190849	SELECT * FROM students	\N	\N	\N
12	dolgozat6	Mi a helyzet	11	2025-03-29 14:12:35.504271	SELECT * FROM students	\N	\N	\N
13	dolgozat7	Mi a helyzet	11	2025-03-29 14:14:49.695091	SELECT * FROM students	students_dataset	\N	\N
14	dolgozat8	lekérdezés	11	2025-03-29 15:19:08.463438	SELECT * FROM students	students_dataset	\N	\N
15	dolgozat9	semmi	11	2025-03-29 16:45:26.329756	SELECT * FROM students	employees_dataset	\N	\N
16	Listázd a HR dolgozókat!	Keresd ki a HR osztály tagjait	11	2025-03-29 20:20:22.053218	SELECT * FROM employees_dataset WHERE department = 'HR';	employees_dataset	\N	\N
17	Listázd a HR dolgozókat!	Keresd ki a HR osztály tagjait	11	2025-03-29 20:33:02.99112	SELECT * FROM employees_dataset WHERE department = 'HR';	employees_dataset	1	\N
18	1.	első	11	2025-03-29 20:41:39.690376	SELECT * FROM students	employees_dataset	1	\N
19	Feladat_1	Irasd ki a tanulok nevét	11	2025-03-30 12:21:57.540486	SELECT * FROM students	students_dataset	2	\N
20	1_Feladat	nevek	11	2025-03-30 19:58:11.419621	SELECT * FROM students	students_dataset	3	\N
21	2_feladat	ez is nevek	11	2025-03-30 19:58:31.254714	SELECT * FROM students	students_dataset	3	\N
22	3_feladat	ez is nevek 2	11	2025-03-30 19:58:49.324395	SELECT * FROM students	students_dataset	3	\N
23	Feladat_11	elso	11	2025-03-31 09:24:43.333325	SELECT * FROM student	students_dataset	4	\N
24	feladat_22	masodik	11	2025-03-31 09:25:51.355411	SELECT * FROM student	students_dataset	4	\N
25	feladat_33	harmadik	11	2025-03-31 09:26:16.128927	SELECT * FROM student	students_dataset	4	\N
26	feladat21	21	11	2025-03-31 12:05:01.955364	SELECT * FROM students	students_dataset	5	\N
27	feladat22	22	11	2025-03-31 12:05:23.747327	SELECT * FROM students	students_dataset	5	\N
28	Feladat1_dolg6	1.	11	2025-03-31 19:42:55.709152	SELECT * FROM students_dataset	students_dataset	6	\N
29	feladat2_dolg6	2.	11	2025-03-31 19:43:19.956226	SELECT * FROM students_dataset	students_dataset	6	\N
30	Feladat_8_1	Add meg a tanulók nevét	14	2025-04-01 13:58:03.016075	SELECT * FROM students_dataset	students_dataset	7	\N
31	1. feladat	Irasd ki\n\n	14	2025-04-01 14:34:25.730696	select * from students_dataset	students_dataset	8	\N
32	1. feladat	Irasd ki az adatokat	16	2025-04-01 15:16:39.942988	select * from students_dataset	students_dataset	9	\N
33	Feladat1	Írasd ki a diákokhoz tartozó jegyeket!	19	2025-04-23 15:09:13.216974	SELECT \n  students_dataset.name,\n  grades_dataset.subject,\n  grades_dataset.grade,\n  grades_dataset.grade_date\nFROM \n  students_dataset\nJOIN \n  grades_dataset\nON \n  students_dataset.id = grades_dataset.student_id;	students_dataset	10	\N
34	Feladat1	írassa ki a diákokhoz tartozó jegyek átlagát, a diákoknak elég az id-t.	19	2025-04-23 17:35:40.782571	select student_id,avg(grade) from \ngrades_dataset\nwhere 1=1\ngroup by student_id;	students_dataset	11	\N
35	1	x	19	2025-04-24 11:58:25.184735	select * from attendance_dataset;	attendance_dataset	11	\N
36	2	x	19	2025-04-24 12:50:11.067896	select * from students_dataset;	students_dataset	11	grades_dataset
37	1. Feladat	Irasd ki az adatokat a students_dataset tablabol!	22	2025-04-27 15:21:43.714192	Select * From students_dataset;	students_dataset	12	
38	2. Feladat	Írj egy SQL-lekérdezést, amely megjeleníti azoknak a diákoknak a nevét, a tantárgy nevét és a kapott érdemjegyét, akik matematikából kaptak jegyet!	22	2025-04-27 15:22:45.572781	SELECT \n  students_dataset.name AS student_name,\n  grades_dataset.subject,\n  grades_dataset.grade\nFROM \n  students_dataset\nJOIN \n  grades_dataset\nON \n  students_dataset.id = grades_dataset.student_id\nWHERE \n  grades_dataset.subject = 'Matematika';	students_dataset	12	grades_dataset
\.


--
-- TOC entry 4877 (class 0 OID 16393)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, name) FROM stdin;
2	teszt@example.com	$2b$10$pMf0pzXS30MgVRfJjNRUieCbMEVNhF1j.pKvW2a1PkuB47cSmBtH6	student	\N
3	valami@valami.hu	$2b$10$6PuvVJhwPtTBwvIFk8jdp.keqDoZ.kY7GSJhVy1Wx9P2.cMuHynn.	teacher	\N
5	tanar1@example.com	$2b$10$gqZo4Bohrw/wftvAdN/53e.XwaLFyqGJ7LdxRpohv8NZos0DNnJOq	teacher	\N
6	imre@proba.hu	$2b$10$SJVbqyT9d6yJHHtb7O7TT.CrtI/r46wHZKp8AK7H0aZICauIWtZ42	teacher	Imre
7	diak@diak.hu	$2b$10$faZI0lcNpQetYNWiF3eFCed1vxrE/myY77uXa99K9UhhFjg8HzmdS	student	Feri
8	diak@example.com	$2b$10$6SattMteR7HPVQ/Er04Y9ulS4mCqF16btPYCVLdmjjg2.PIxWXpnG	student	Dóra Diák
9	agnes@proba.hu	$2b$10$4f5zUJccMpfpFgFrf/vlNOWWznL9BFIVVP8W4RjmWtAPjfi9TPPia	student	Ágnes
10	diak2@proba.hu	$2b$10$Mi2GBW8peJEDQwEEe0HN5uws11e4VDRzUM0hoJ4QTqfrhngISRKiy	student	Ágnes Övet
11	imi@cim.hu	$2b$10$/DKUHYlgCHqdpt7Iti3sJuvp6XxolvjlF/W..qqoph8fIdQO5DDKq	teacher	Imi
12	misi@cim.hu	$2b$10$TlOF9UN9aZCEt3gpbJjzUOEZIp659gXpI4yFDVScq23ZJKyCt0Am2	student	Misi
13	kati@cim.hu	$2b$10$rwzPHuNgLmc1PIP0IbqQMenjKmpwYsgsAQIRR1Aq4IgfAXZvO754C	student	kati
14	tanar1@cim.hu	$2b$10$Pp77TZLEw0aZOrlCjxoGO.C6tLTNPgQPZhRamWvLLGYCGYUt9L8D.	teacher	Kiss Ferenc
15	diak1@cim.hu	$2b$10$2Ml/PWy8eixF5MLpqfH2uesOYNCHipGaWUbiTmzky4FYdjCosn0aS	student	Nagy Géza
16	sandor@cim.hu	$2b$10$t2SnJGamFMLn/a.iuO3iIOQpoXjdoWDRWrcS9kUTCbygHMskqqaLu	teacher	Sándor
17	imre@cim.hu	$2b$10$W7Wvueibm43sdqT0TP/cdOc/ToqMBN6soJT5LTGbEEjkySv3cSlYm	student	Imre
19	tanar2@tanar2.hu	$2b$10$P9XYLsL93IwVmLV5vferKO0Y60cMdVqSrx7QTUMKpkwbBIQWVrsf.	teacher	Tanar2
20	diak5@diak5.hu	$2b$10$LgOn6P7KsMzhaeQYnvk5r.cLt8qsxLw7QX8fN8eTtZTjNKffOdwAa	student	Diak5
21	tanarimre@email.hu	$2b$10$L0jfEiW1ZjCrgHaKzBLQ8eFkpgMA4MoIvYpt/wlAYE8Xv9EJjMTvi	student	Tanár Imre
22	abrahamimre@email.hu	$2b$10$BQZLQ.cFQ3HFpjbzHwDSPeyNtmjJInVW.U6T1kuXHcI5LFpcPdK6O	teacher	Abraham Imre
23	diakimre@email.hu	$2b$10$e.VkPL1/W71ut/2/wwzsI.WNPMIMhzrQWV0q6AAtrtweTvm2fB2dS	student	Diak Imre
\.


--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 235
-- Name: attendance_dataset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attendance_dataset_id_seq', 9, true);


--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 229
-- Name: books_dataset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_dataset_id_seq', 5, true);


--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 227
-- Name: employees_dataset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_dataset_id_seq', 5, true);


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 231
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exams_id_seq', 12, true);


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 233
-- Name: grades_dataset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grades_dataset_id_seq', 7, true);


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 223
-- Name: solutions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solutions_id_seq', 96, true);


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 225
-- Name: students_dataset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_dataset_id_seq', 5, true);


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 217
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 1, true);


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 221
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 38, true);


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 23, true);


--
-- TOC entry 4721 (class 2606 OID 16511)
-- Name: attendance_dataset attendance_dataset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_dataset
    ADD CONSTRAINT attendance_dataset_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 16465)
-- Name: books_dataset books_dataset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_dataset
    ADD CONSTRAINT books_dataset_pkey PRIMARY KEY (id);


--
-- TOC entry 4713 (class 2606 OID 16456)
-- Name: employees_dataset employees_dataset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees_dataset
    ADD CONSTRAINT employees_dataset_pkey PRIMARY KEY (id);


--
-- TOC entry 4717 (class 2606 OID 16475)
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 16499)
-- Name: grades_dataset grades_dataset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades_dataset
    ADD CONSTRAINT grades_dataset_pkey PRIMARY KEY (id);


--
-- TOC entry 4709 (class 2606 OID 16428)
-- Name: solutions solutions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solutions
    ADD CONSTRAINT solutions_pkey PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 16447)
-- Name: students_dataset students_dataset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students_dataset
    ADD CONSTRAINT students_dataset_pkey PRIMARY KEY (id);


--
-- TOC entry 4701 (class 2606 OID 16391)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 4707 (class 2606 OID 16413)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 4703 (class 2606 OID 16403)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4705 (class 2606 OID 16401)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4728 (class 2606 OID 16512)
-- Name: attendance_dataset attendance_dataset_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_dataset
    ADD CONSTRAINT attendance_dataset_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees_dataset(id);


--
-- TOC entry 4726 (class 2606 OID 16476)
-- Name: exams exams_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- TOC entry 4727 (class 2606 OID 16500)
-- Name: grades_dataset grades_dataset_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades_dataset
    ADD CONSTRAINT grades_dataset_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students_dataset(id);


--
-- TOC entry 4724 (class 2606 OID 16434)
-- Name: solutions solutions_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solutions
    ADD CONSTRAINT solutions_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- TOC entry 4725 (class 2606 OID 16429)
-- Name: solutions solutions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solutions
    ADD CONSTRAINT solutions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4722 (class 2606 OID 16414)
-- Name: tasks tasks_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- TOC entry 4723 (class 2606 OID 16481)
-- Name: tasks tasks_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id);


-- Completed on 2025-05-06 14:25:51

--
-- PostgreSQL database dump complete
--

