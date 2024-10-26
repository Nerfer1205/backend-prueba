-- Consultas SQL para el sistema de cursos y estudiantes

-- 1. Cuántos cursos se tienen por modalidad
SELECT 
    m.name AS modalidad,
    COUNT(c.id) AS cantidad_cursos
FROM 
    Course c
JOIN 
    Modality m ON c.modalityId = m.id
GROUP BY 
    m.name
ORDER BY 
    cantidad_cursos DESC;

-- 2. Cantidad de estudiantes por estado de matrícula en cada curso
SELECT 
    c.name AS curso,
    is.name AS estado_matricula,
    COUNT(uc.userId) AS cantidad_estudiantes
FROM 
    UserCourse uc
JOIN 
    Course c ON uc.courseId = c.id
JOIN 
    InscriptionStatus is ON uc.inscriptionId = is.id
GROUP BY 
    c.name, is.name
ORDER BY 
    c.name, is.name;

-- 3. Promedio de estudiantes registrados en el sistema, el curso con más inscriptos y el curso con menos inscriptos

-- Promedio de estudiantes registrados en el sistema
SELECT 
    COUNT(DISTINCT u.id) AS total_estudiantes,
    AVG(cantidad) AS promedio_estudiantes
FROM (
    SELECT 
        uc.courseId,
        COUNT(uc.userId) AS cantidad
    FROM 
        UserCourse uc
    GROUP BY 
        uc.courseId
) AS curso_estudiantes
JOIN User u ON curso_estudiantes.userId = u.id;

-- Curso con más inscriptos
SELECT 
    c.name AS curso,
    COUNT(uc.userId) AS cantidad_inscriptos
FROM 
    UserCourse uc
JOIN 
    Course c ON uc.courseId = c.id
GROUP BY 
    c.id
ORDER BY 
    cantidad_inscriptos DESC
LIMIT 1;

-- Curso con menos inscriptos
SELECT 
    c.name AS curso,
    COUNT(uc.userId) AS cantidad_inscriptos
FROM 
    UserCourse uc
JOIN 
    Course c ON uc.courseId = c.id
GROUP BY 
    c.id
ORDER BY 
    cantidad_inscriptos ASC
LIMIT 1;
