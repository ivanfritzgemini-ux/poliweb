module.exports = [
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/src/lib/supabase.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://wlvscjityfaimzuzcqzb.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdnNjaml0eWZhaW16dXpjcXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MTcyMDQsImV4cCI6MjA3Mjk5MzIwNH0.cmtLthBIFYueMyc5mlTGZA7iHl4KAA7l-hIttIRc6E8");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/src/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002c0be17c4c9d0cd71f6d28ebdbf357b0e3ec02a0":"getStaffCount","002cae2ab73074cac8e1a18f0a76826dc2724e08c9":"getCourses","00386b2f23b707804c4d42a00f1c1dd3f13e5a0641":"getStudentsCount","0051cb4b94e15b235ad8d034b28028d3e1ffb09f2f":"getRoles","0082309dadbc7c810b97a93aa686482419fc5663c6":"getCoursesCount","00a6e63fd18cf0656b30dbf33c97edf359cc8330f7":"getSexos","4016795ddec248089d1b21edbbd148f281472e6fb4":"getRecentStaffActivity","403415939a9ea9c93f2815d33728b0a210d9eeddb3":"getStaffByRut","4046f937ec99c088058cc433ce217efd4ee0c0b4e8":"addStudent","407a546f6049164b6a1c4f4b954a744bb33c7e3503":"getRecentEnrollments","40c731e554ef2a9d8e7bbc7a07ef597a440c26a7a8":"getRoleIdByName","40d88e2fc2fe209e7023e90060f327268ea714b989":"addStaff","602315f4325c4ccc06141901081b1c48fee8dbe4e6":"getStaff","605c748803f3a1841fadb3505e61cf5db9c22f19de":"updateStudent","6078d5f6813634e7c71f75558b04a6d222fc604017":"getStudents","60cbd0ec347b12ebbaf865f052f30bcc24ffe9cb5e":"createUser","70ec89556619f47d580b19a43c73fb9cf0511a2597":"updateStaff"},"",""] */ __turbopack_context__.s([
    "addStaff",
    ()=>addStaff,
    "addStudent",
    ()=>addStudent,
    "createUser",
    ()=>createUser,
    "getCourses",
    ()=>getCourses,
    "getCoursesCount",
    ()=>getCoursesCount,
    "getRecentEnrollments",
    ()=>getRecentEnrollments,
    "getRecentStaffActivity",
    ()=>getRecentStaffActivity,
    "getRoleIdByName",
    ()=>getRoleIdByName,
    "getRoles",
    ()=>getRoles,
    "getSexos",
    ()=>getSexos,
    "getStaff",
    ()=>getStaff,
    "getStaffByRut",
    ()=>getStaffByRut,
    "getStaffCount",
    ()=>getStaffCount,
    "getStudents",
    ()=>getStudents,
    "getStudentsCount",
    ()=>getStudentsCount,
    "updateStaff",
    ()=>updateStaff,
    "updateStudent",
    ()=>updateStudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getStaff(page = 1, pageSize = 10) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    const { data, error, count } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('id, rut, nombres, apellidos, email, status, fecha_nacimiento, sexo(id, nombre), role:roles(id, nombre_rol)', {
        count: 'exact'
    }).order('rut', {
        ascending: true
    }) // Order by RUT for consistent pagination
    .range(start, end);
    if (error) {
        console.error('Error fetching staff:', error);
        throw new Error('Could not fetch staff data.');
    }
    return {
        data: data,
        totalCount: count || 0
    };
}
async function getStaffCount() {
    const { count, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('id', {
        count: 'exact',
        head: true
    });
    if (error) {
        console.error('Error fetching staff count:', error);
        throw new Error('Could not fetch staff count.');
    }
    return count || 0;
}
async function getStudentsCount() {
    const { count, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('id', {
        count: 'exact',
        head: true
    });
    if (error) {
        console.error('Error fetching student count:', error);
        throw new Error('Could not fetch student count.');
    }
    return count || 0;
}
async function getRecentEnrollments(limit = 3) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('nro_registro, fecha_matricula, curso:cursos(id, nivel, letra), usuario:usuarios(nombres, apellidos)').order('fecha_matricula', {
        ascending: false
    }).limit(limit);
    if (error) {
        console.error('Error fetching recent enrollments:', error);
        throw new Error('Could not fetch recent enrollments.');
    }
    return data.map((s)=>({
            name: `${s.usuario.nombres} ${s.usuario.apellidos}`,
            grade: s.curso?.nivel ? `${s.curso.nivel}º Medio ${s.curso.letra}` : null,
            enrollmentDate: s.fecha_matricula
        }));
}
async function getRecentStaffActivity(limit = 3) {
    // This is a placeholder. Real activity would come from an audit log or similar.
    // For now, we'll just return some recent staff members.
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('nombres, apellidos').limit(limit);
    if (error) {
        console.error('Error fetching recent staff activity:', error);
        throw new Error('Could not fetch recent staff activity.');
    }
    return data.map((s)=>({
            name: `${s.nombres} ${s.apellidos}`,
            action: 'realizó alguna acción.'
        }));
}
async function getSexos() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('sexo').select('id, nombre');
    if (error) {
        console.error('Error fetching sexos:', error);
        throw new Error('Could not fetch sexos data.');
    }
    return data.map((sexo)=>({
            ...sexo,
            id: String(sexo.id)
        }));
}
async function getRoles() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('roles').select('id, nombre_rol');
    if (error) {
        console.error('Error fetching roles:', error);
        throw new Error('Could not fetch roles data.');
    }
    return data.map((role)=>({
            ...role,
            id: String(role.id)
        }));
}
async function getRoleIdByName(roleName) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('roles').select('id').eq('nombre_rol', roleName).single();
    if (error && error.code !== 'PGRST116') {
        console.error(`Error fetching role ID for ${roleName}:`, error);
        throw new Error(`Could not fetch role ID for ${roleName}.`);
    }
    return data ? String(data.id) : null;
}
async function addStaff(formData) {
    const { email, password, ...rest } = formData;
    const { data: authData, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
        email,
        password
    });
    if (authError) {
        console.error('Error signing up user:', authError);
        throw new Error(authError.message);
    }
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').insert({
        id: authData.user?.id,
        rut: rest.rut,
        nombres: rest.nombres,
        apellidos: rest.apellidos,
        sexo_id: rest.sexo_id,
        email: email,
        rol_id: rest.rol_id,
        fecha_nacimiento: rest.fecha_nacimiento,
        telefono: rest.telefono || null,
        direccion: rest.direccion || null
    }).select('id, rut, nombres, apellidos, email, status, sexo(id, nombre), role:roles(id, nombre_rol)').single();
    if (error) {
        console.error('Error inserting staff data:', error);
        throw new Error(error.message);
    }
    return data;
}
async function updateStaff(rut, updates, userId) {
    const { email, password, ...profileUpdates } = updates;
    // 1. Update Supabase Auth if email or password are provided
    if (email || password) {
        const authUpdates = {};
        if (email) authUpdates.email = email;
        if (password) authUpdates.password = password;
        if (!userId) {
            throw new Error('User ID is required to update email or password.');
        }
        const { data: authData, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].auth.admin.updateUserById(userId, authUpdates);
        if (authError) {
            console.error('Error updating auth user:', authError);
            throw new Error(authError.message);
        }
        // If email was changed, update it in the profile table as well
        if (email) {
            profileUpdates.email = email;
        }
    }
    // 2. Update the public.usuarios table
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').update(profileUpdates).eq('rut', rut);
    if (error) {
        console.error('Error updating staff data:', error);
        throw new Error(error.message);
    }
    return data;
}
async function getStaffByRut(rut) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('id, rut, nombres, apellidos, email, status, sexo(id, nombre), role:roles(id, nombre_rol), telefono, direccion, fecha_nacimiento').eq('rut', rut).single();
    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching staff by RUT:', error);
        throw new Error('No se pudo buscar el personal por RUT.');
    }
    return data;
}
async function getStudents(page = 1, pageSize = 10) {
    const rangeFrom = (page - 1) * pageSize;
    const rangeTo = page * pageSize - 1;
    const { data, error, count } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('nro_registro, fecha_matricula, fecha_retiro, curso:cursos(id, nivel, letra), usuario:usuarios(id, rut, nombres, apellidos, fecha_nacimiento, sexo:sexo(id, nombre), email, telefono, direccion)', {
        count: 'exact'
    }).order('nro_registro', {
        ascending: true
    }).range(rangeFrom, rangeTo);
    if (error) {
        console.error('Error fetching students:', error);
        throw new Error('Could not fetch student data.');
    }
    const students = data.map((s)=>{
        const student = {
            ...s.usuario,
            ...s,
            id: s.nro_registro,
            userId: s.usuario.id,
            grade: s.curso?.nivel ? `${s.curso.nivel}º Medio ${s.curso.letra}` : null,
            enrollmentDate: s.fecha_matricula
        };
        student.sexo = s.usuario.sexo;
        student.curso = s.curso;
        return student;
    });
    return {
        students,
        totalCount: count || 0
    };
}
async function getCourses() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('cursos').select('id, nivel, letra');
    if (error) {
        console.error('Error fetching courses:', error);
        throw new Error('Could not fetch courses data.');
    }
    return data.map((curso)=>({
            id: String(curso.id),
            nombre: `${curso.nivel}º Medio ${curso.letra}`
        }));
}
async function getCoursesCount() {
    const { count, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('cursos').select('id', {
        count: 'exact',
        head: true
    });
    if (error) {
        console.error('Error fetching course count:', error);
        throw new Error('Could not fetch course count.');
    }
    return count || 0;
}
async function createUser(userData, rol_id = null) {
    const { email, password, ...rest } = userData;
    // Generate a random password if not provided
    const userPassword = password || Math.random().toString(36).substring(2, 15);
    const { data: authData, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
        email,
        password: userPassword
    });
    if (authError) {
        console.error('Error signing up user:', authError);
        throw new Error(authError.message);
    }
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').insert({
        id: authData.user?.id,
        rut: rest.rut,
        nombres: rest.nombres,
        apellidos: rest.apellidos,
        sexo_id: rest.sexo_id,
        email: email,
        fecha_nacimiento: rest.fecha_nacimiento,
        telefono: rest.phone || null,
        direccion: rest.address || null,
        rol_id: rol_id
    }).select('id').single();
    if (error) {
        console.error('Error inserting user data:', error);
        throw new Error(error.message);
    }
    return data.id; // Return the new user's ID
}
async function addStudent(studentData) {
    // This function now only inserts into 'estudiantes_detalles'
    // It assumes the user (identified by RUT) already exists in the 'usuarios' table.
    // Check if the user is already a student
    const { data: existingStudent, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('id').eq('id', studentData.usuario).maybeSingle();
    if (checkError) {
        console.error('Error checking for existing student:', checkError);
        throw new Error('Error al verificar la matrícula del estudiante.');
    }
    if (existingStudent) {
        throw new Error('El usuario ya se encuentra matriculado como estudiante.');
    }
    const { data: newStudent, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').insert({
        id: studentData.usuario,
        nro_registro: studentData.id,
        curso_id: studentData.curso_id,
        fecha_matricula: studentData.enrollmentDate
    }).select('id').single();
    if (error) {
        console.error('Error inserting student data:', error);
        throw new Error(error.message);
    }
    // Fetch the newly created student with all the necessary joins
    const { data: createdStudent, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('nro_registro, fecha_matricula, fecha_retiro, curso:cursos(id, nivel, letra), usuario:usuarios(id, rut, nombres, apellidos, fecha_nacimiento, sexo:sexo(id, nombre), email, telefono, direccion)').eq('id', newStudent.id).single();
    if (fetchError) {
        console.error('Error fetching newly created student:', fetchError);
        throw new Error('Could not fetch newly created student data.');
    }
    const student = {
        ...createdStudent.usuario,
        ...createdStudent,
        id: createdStudent.nro_registro,
        userId: createdStudent.usuario.id,
        grade: createdStudent.curso?.nivel ? `${createdStudent.curso.nivel}º Medio ${createdStudent.curso.letra}` : null,
        enrollmentDate: createdStudent.fecha_matricula
    };
    student.sexo = createdStudent.usuario.sexo;
    student.curso = createdStudent.curso;
    return student;
}
async function updateStudent(userId, updates) {
    const { // Fields for 'usuarios' table
    nombres, apellidos, sexo_id, fecha_nacimiento, telefono, direccion, // Fields for 'estudiantes_detalles' table
    curso_id, fecha_matricula, fecha_retiro } = updates;
    // 1. Update the 'usuarios' table
    const { error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').update({
        nombres,
        apellidos,
        sexo_id,
        fecha_nacimiento,
        telefono,
        direccion
    }).eq('id', userId);
    if (userError) {
        console.error('Error updating student user data:', userError);
        throw new Error('Could not update student user data.');
    }
    // 2. Update the 'estudiantes_detalles' table
    const { error: studentDetailsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').update({
        curso_id,
        fecha_matricula,
        fecha_retiro
    }).eq('id', userId);
    if (studentDetailsError) {
        console.error('Error updating student details:', studentDetailsError);
        throw new Error('Could not update student details.');
    }
    // 3. Fetch and return the updated student data
    const { data: updatedStudent, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('nro_registro, fecha_matricula, fecha_retiro, curso:cursos(id, nivel, letra), usuario:usuarios(id, rut, nombres, apellidos, fecha_nacimiento, sexo:sexo(id, nombre), email, telefono, direccion)').eq('id', userId).single();
    if (fetchError) {
        console.error('Error fetching updated student data:', fetchError);
        throw new Error('Could not fetch updated student data.');
    }
    const mappedStudent = {
        ...updatedStudent.usuario,
        ...updatedStudent,
        id: updatedStudent.nro_registro,
        userId: updatedStudent.usuario.id,
        grade: updatedStudent.curso?.nivel ? `${updatedStudent.curso.nivel}º Medio ${updatedStudent.curso.letra}` : null,
        enrollmentDate: updatedStudent.fecha_matricula
    };
    mappedStudent.sexo = updatedStudent.usuario.sexo;
    mappedStudent.curso = updatedStudent.curso;
    return mappedStudent;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getStaff,
    getStaffCount,
    getStudentsCount,
    getRecentEnrollments,
    getRecentStaffActivity,
    getSexos,
    getRoles,
    getRoleIdByName,
    addStaff,
    updateStaff,
    getStaffByRut,
    getStudents,
    getCourses,
    getCoursesCount,
    createUser,
    addStudent,
    updateStudent
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStaff, "602315f4325c4ccc06141901081b1c48fee8dbe4e6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStaffCount, "002c0be17c4c9d0cd71f6d28ebdbf357b0e3ec02a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentsCount, "00386b2f23b707804c4d42a00f1c1dd3f13e5a0641", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentEnrollments, "407a546f6049164b6a1c4f4b954a744bb33c7e3503", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentStaffActivity, "4016795ddec248089d1b21edbbd148f281472e6fb4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSexos, "00a6e63fd18cf0656b30dbf33c97edf359cc8330f7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoles, "0051cb4b94e15b235ad8d034b28028d3e1ffb09f2f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoleIdByName, "40c731e554ef2a9d8e7bbc7a07ef597a440c26a7a8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStaff, "40d88e2fc2fe209e7023e90060f327268ea714b989", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStaff, "70ec89556619f47d580b19a43c73fb9cf0511a2597", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStaffByRut, "403415939a9ea9c93f2815d33728b0a210d9eeddb3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudents, "6078d5f6813634e7c71f75558b04a6d222fc604017", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCourses, "002cae2ab73074cac8e1a18f0a76826dc2724e08c9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCoursesCount, "0082309dadbc7c810b97a93aa686482419fc5663c6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUser, "60cbd0ec347b12ebbaf865f052f30bcc24ffe9cb5e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStudent, "4046f937ec99c088058cc433ce217efd4ee0c0b4e8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStudent, "605c748803f3a1841fadb3505e61cf5db9c22f19de", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "002c0be17c4c9d0cd71f6d28ebdbf357b0e3ec02a0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStaffCount"],
    "00386b2f23b707804c4d42a00f1c1dd3f13e5a0641",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudentsCount"],
    "0082309dadbc7c810b97a93aa686482419fc5663c6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCoursesCount"],
    "4016795ddec248089d1b21edbbd148f281472e6fb4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentStaffActivity"],
    "407a546f6049164b6a1c4f4b954a744bb33c7e3503",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentEnrollments"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/page.tsx", "default");
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__161e8a7e._.js.map