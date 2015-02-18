import glob
import os
import yaml

from jinja2 import Environment, FileSystemLoader


TEMPLATES_DIR = 'templates'
CASE_STUDIES = yaml.load(open('data/case-studies-en.yaml'))
ENUMS = yaml.load(open('data/enums.yaml'))
CONTENT = yaml.load(open('data/content.yaml'))
template_data = {
	'title': 'Crowdsourcing Advisor - a GovLab production',
	'case_studies': CASE_STUDIES, 
	'enums': ENUMS,
	'content': CONTENT,
	'total_case_studies': len(CASE_STUDIES)
}

def Main():
	env = Environment(loader=FileSystemLoader(TEMPLATES_DIR),
		extensions=['jinja2.ext.with_'])
	pages = ["index", 'advisor']
	for page in pages:
		template = env.get_template('%s.html' % page)
		html = template.render(template_data)
		with open('site/%s.html' % page, 'w') as f:
			f.write(html.encode('utf8'))
			f.close()
	projects = {}
	for case in CASE_STUDIES:
		projects[case['title'].replace(" ","-").lower()] = case
	#Delete all case study files
	old_case_studies = glob.glob('site/ajax/*')
	for f in old_case_studies:
		os.remove(f)
	#Recreate new ones
	error_dimensions = dimensions_validated()
	if not len(error_dimensions):
		for key, value in projects.items():
			template = env.get_template('project.html')
			html = template.render(value)
			with open('site/ajax/{}.html'.format(key), 'w') as f:
				f.write(html.encode('utf8'))
				f.close()
	else:
		print "Error, dimensions are not properly labeled: "
		for dim in error_dimensions:
			print dim
	#make the js
	items = { "items":sort_items() } 
	template = env.get_template('main.js')
	js = template.render(items)
	with open('site/js/main.js', 'w') as f:
		f.write(js.encode('utf8'))
		f.close()



def dimensions_validated():
	categories = []
	variables = ['activity', 'incentives', 'interface', 'participation', 'quality_control']
	for case in template_data['case_studies']:
	    for v in variables:
	        if case['dimensions'][v]:
	            for c in case['dimensions'][v]:
	                categories.append(c)
	categories = list(set(categories))
	cats = [dim['name'].lower() for dim in template_data['enums']['advisor_dimensions']]
	error_dimensions = [c for c in categories if c.lower() not in cats]
	return error_dimensions

def sort_items():
	items = []
	cats = [dim['name'].lower().replace(" ", "-") for dim in template_data['enums']['advisor_dimensions']]
	variables = ['activity', 'incentives', 'interface', 'participation', 'quality_control']
	for case in template_data['case_studies']:
	    categories = []
	    for v in variables:
	        if case['dimensions'][v]:
	            for c in case['dimensions'][v]:
	                categories.append(c.lower().replace(" ", "-"))
	    cats_selected = []
	    for c in cats:
	        if c in categories:
	            cats_selected.append(1)
	        else: 
	            cats_selected.append(0)
	    items.append({"title":case['title'], "url":case['title'].replace(" ","-").lower(), "scores":cats_selected})
	return items

if __name__ == '__main__':
  Main()