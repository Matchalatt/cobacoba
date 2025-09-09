
import React, { useState, useCallback } from 'react';
import { Lightbulb, Package, Target, ListChecks, Loader2, Wand2 } from 'lucide-react';
import { generateProductIdea } from '../services/geminiService';
import type { GeneratedIdea } from '../types';

const ProductIdeaGeneratorPage: React.FC = () => {
    const [category, setCategory] = useState('Tech Gadgets');
    const [keywords, setKeywords] = useState('sustainable, smart home, minimalist');
    const [generatedIdea, setGeneratedIdea] = useState<GeneratedIdea | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedIdea(null);

        try {
            const idea = await generateProductIdea(category, keywords);
            setGeneratedIdea(idea);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [category, keywords]);
    
    const IdeaCard: React.FC<{idea: GeneratedIdea}> = ({ idea }) => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                    <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{idea.name}</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">{idea.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                         <Target className="w-5 h-5 text-primary-500" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Target Audience</h3>
                    </div>
                    <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-gray-700 dark:text-gray-300">{idea.targetAudience}</p>
                </div>
                
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="w-5 h-5 text-primary-500" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Key Features</h3>
                    </div>
                    <ul className="space-y-2">
                        {idea.keyFeatures.map((feature, index) => (
                            <li key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-gray-700 dark:text-gray-300">{feature}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-3">
                 <Lightbulb className="w-8 h-8 text-primary-500" />
                <h2 className="text-3xl font-bold tracking-tight">AI Product Idea Generator</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
                Leverage Gemini to brainstorm your next best-selling product.
            </p>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Category</label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g., Home Goods, Fashion, Electronics"
                        />
                    </div>
                     <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</label>
                        <input
                            type="text"
                            id="keywords"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g., eco-friendly, minimalist, for pets"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                             <>
                                <Wand2 className="mr-2 h-4 w-4" />
                                Generate Idea
                            </>
                        )}
                    </button>
                </form>
            </div>
            
            {error && <div className="mt-4 text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</div>}
            
            {generatedIdea && <IdeaCard idea={generatedIdea} />}

        </div>
    );
};

export default ProductIdeaGeneratorPage;
