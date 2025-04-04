import React from 'react';
import Layout from '../components/Layout';

const FAQ = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h1>

          {/* FAQ Section */}
          <div className="space-y-6">
            {/* Question 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">1. How do I create a new note?</h2>
              <p className="text-gray-600">
                To create a new note, navigate to the "Notes" page and click the "Add Note" button. Fill in the title and description, then click "Save" to create your note.
              </p>
            </div>

            {/* Question 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Can I organize my notes into categories?</h2>
              <p className="text-gray-600">
                Yes, you can organize your notes into categories. Go to the "Categories" page, create a new category, and assign your notes to the desired category.
              </p>
            </div>

            {/* Question 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">3. How do I edit or delete a note?</h2>
              <p className="text-gray-600">
                To edit a note, click the "Edit" button on the note card. To delete a note, click the "Delete" button. Note that deleted notes are moved to the trash and can be restored or permanently deleted from there.
              </p>
            </div>

            {/* Question 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Is my data secure?</h2>
              <p className="text-gray-600">
                Yes, your data is secure. We use encryption and follow best practices to ensure your notes and personal information are protected.
              </p>
            </div>

            {/* Question 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">5. How do I recover a deleted note?</h2>
              <p className="text-gray-600">
                Deleted notes are moved to the "Trash" section. You can restore a note from the trash or permanently delete it if needed.
              </p>
            </div>

            {/* Question 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Can I share my notes with others?</h2>
              <p className="text-gray-600">
                Currently, E-Notes does not support direct note sharing. However, you can copy the content of your notes and share them manually.
              </p>
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions? Contact our support team for assistance.</p>
            <a
              href="mailto:support@enotes.com"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;