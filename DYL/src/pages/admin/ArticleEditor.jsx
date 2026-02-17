import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader, Upload, X } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';

const ArticleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Consciousness',
        excerpt: '',
        content: '',
        image: '',
        readTime: '5 min',
        author: 'Aashna Ahuja',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });

    useEffect(() => {
        if (isEditing) {
            fetchArticle();
        }
    }, [id]);

    const fetchArticle = async () => {
        try {
            const res = await axios.get(`/api/posts/${id}`);
            setFormData(res.data);
            if (res.data.image) {
                setImagePreview(res.data.image);
            }
        } catch (error) {
            console.error("Error getting document:", error);
            alert("Could not fetch article.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (content) => {
        setFormData({ ...formData, content });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setFormData({ ...formData, image: '' });
    };

    const uploadImage = async () => {
        if (!imageFile) return formData.image;

        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        try {
            const res = await axios.post('/api/upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return res.data; // Returns the URL
        } catch (error) {
            console.error("Image upload failed:", error);
            throw new Error("Image upload failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;

            if (imageFile) {
                setUploading(true);
                imageUrl = await uploadImage();
                setUploading(false);
            }

            const postData = { ...formData, image: imageUrl };
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: token }
            };

            if (isEditing) {
                await axios.put(`/api/posts/${id}`, postData, config);
            } else {
                await axios.post('/api/posts', postData, config);
            }
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Error saving article. " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'blockquote'],
            ['clean']
        ],
    };

    return (
        <div className="min-h-screen bg-[var(--color-primary)] px-8 pt-32 pb-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-white mb-8 cursor-pointer">
                    <ArrowLeft size={18} /> Back into Dashboard
                </button>

                <h1 className="text-3xl font-serif font-bold mb-8">
                    {isEditing ? 'Edit Article' : 'New Article'}
                </h1>

                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-white/10 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Title</label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-secondary)] focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-secondary)] focus:outline-none text-white appearance-none"
                            >
                                <option className="bg-[var(--color-primary)]" value="Consciousness">Consciousness</option>
                                <option className="bg-[var(--color-primary)]" value="Patterns">Patterns</option>
                                <option className="bg-[var(--color-primary)]" value="Healing">Healing</option>
                                <option className="bg-[var(--color-primary)]" value="Spirituality">Spirituality</option>
                                <option className="bg-[var(--color-primary)]" value="Energy">Energy</option>
                                <option className="bg-[var(--color-primary)]" value="Akashic Records">Akashic Records</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Excerpt (Short Summary)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-secondary)] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Cover Image</label>

                        {imagePreview ? (
                            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4 group border border-white/10">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-red-500/80 transition-colors"
                                >
                                    <X size={20} className="text-white" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center gap-2 w-full px-4 py-12 rounded-xl border-2 border-dashed border-white/20 hover:border-[var(--color-secondary)] hover:bg-white/5 cursor-pointer transition-all">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                <Upload size={32} className="text-[var(--color-secondary)]" />
                                <span className="text-[var(--color-text-muted)]">Click to upload image</span>
                            </label>
                        )}

                        <div className="mt-4">
                            <label className="block text-xs font-bold mb-1 text-[var(--color-text-muted)]">Or enter URL manually</label>
                            <input
                                name="image"
                                type="text"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-secondary)] focus:outline-none text-sm"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="text-editor-container">
                        <label className="block text-sm font-bold mb-2">Content</label>
                        <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={handleContentChange}
                                modules={modules}
                                className="text-white"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/dashboard')}
                            className="px-6 py-3 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            style={{ backgroundColor: '#A98F47', color: '#022C22' }}
                            className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading || uploading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                            {uploading ? 'Uploading...' : (isEditing ? 'Update Article' : 'Publish Article')}
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                .ql-toolbar {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }
                .ql-container {
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                    min-height: 200px;
                }
                .ql-editor {
                    min-height: 200px;
                }
                .ql-stroke {
                    stroke: rgba(255, 255, 255, 0.7) !important;
                }
                .ql-fill {
                    fill: rgba(255, 255, 255, 0.7) !important;
                }
                .ql-picker {
                    color: rgba(255, 255, 255, 0.7) !important;
                }
            `}</style>
        </div>
    );
};

export default ArticleEditor;
