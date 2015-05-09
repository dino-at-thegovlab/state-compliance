import glob
import os
import yaml
import csv

from jinja2 import Environment, FileSystemLoader


TEMPLATES_DIR = 'templates'
CASE_STUDIES = yaml.load(open('data/case-studies-en.yaml'))
ENUMS = yaml.load(open('data/enums.yaml'))
CONTENT = yaml.load(open('data/content.yaml'))
template_data = {
	'title': 'Crowdsourcing Advisor - a GovLab project',
	'case_studies': CASE_STUDIES, 
	'enums': ENUMS,
	'content': CONTENT,
	'total_case_studies': len(CASE_STUDIES)
}

def Main():
	env = Environment(loader=FileSystemLoader(TEMPLATES_DIR),
		extensions=['jinja2.ext.with_'], trim_blocks=True, lstrip_blocks=True)
	#------------Main pages
	pages = ["index", 'advisor', 'about', 'form']
	for page in pages:
		template = env.get_template('%s.html' % page)
		html = template.render(template_data)
		with open('site/%s.html' % page, 'w') as f:
			f.write(html.encode('utf8'))
			f.close()
	#------------Case Studies
	projects = {}
	for case in CASE_STUDIES:
		projects[case['title'].replace(" ","-").lower()] = case
	#Delete all case study files
	old_case_studies = glob.glob('site/ajax/*')
	for f in old_case_studies:
		if f != 'site/ajax/loadMore.html':
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
	#------------ loadMore.html
	template = env.get_template('loadMore.html')
	html = template.render(template_data)
	with open('site/ajax/{}.html'.format('loadMore'), 'w') as f:
		f.write(html.encode('utf8'))
		f.close()
	#make the js
	items = { "items":sort_items() } 
	template = env.get_template('main.js')
	js = template.render(items)
	with open('site/js/main.js', 'w') as f:
		f.write(js.encode('utf8'))
		f.close()
	#create_csv()

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


def create_csv():
	csvwriter = csv.writer(open('site/case_studies.csv', 'w'))
	csvwriter.writerow([
		'title', 'url', 'sector', 'description', 'crowd', 'focus', 'challenges', 'cost', 
		'output', 'duration', 'size', 'lessons', 'city', 'activity', 'incentives', 
		'participation', 'quality_control', 'interface', 'country', 'impact_today', 
		'state', 'thumbnail_url', 'impact_longer_term', 'scope', 'validation', 'type', 
		'historical_information'])
	for case in template_data['case_studies']:
		new_row = [
			case['title'], 
			case['url'], 
			case['sector'], 
			case['description'], 
			case['crowd'], 
			', '.join(case['focus']), 
			case['challenges'], 
			case['cost'], 
			case['output'], 
			case['duration'], 
			case['size'], 
			case['lessons'], 
			case['city'], 
			', '.join(case['dimensions']['activity']), 
			', '.join(case['dimensions']['incentives']), 
			', '.join(case['dimensions']['participation']), 
			', '.join(case['dimensions']['quality_control']), 
			', '.join(case['dimensions']['interface']),
			case['country'], 
			case['impact_today'], 
			case['state'], 
			case['thumbnail_url'],
			case['impact_longer_term'], 
			', '.join(case['scope']), 
			case['validation'], 
			case['type'], 
			case['historical_information']
		]
		for i in range(len(new_row)):  # For every value in our newrow
			if hasattr(new_row[i], 'encode'):
				new_row[i] = new_row[i].encode('utf8')
		csvwriter.writerow(new_row)

if __name__ == '__main__':
  Main()